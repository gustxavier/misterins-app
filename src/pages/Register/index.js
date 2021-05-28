import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import api from '../../services/api';
import { Container, Grid, Typography } from '@material-ui/core';
import { Link, withRouter} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import InputMask from 'react-input-mask';
import { SimpleNoty } from '../../helpers/NotyFeedBack';
import { SimpleSwal } from '../../helpers/SwalFeedBack';
import './styles.css'

class Register extends React.Component {

  constructor(props) {
    super(props);

    if (!ValidatorForm.hasValidationRule('isPasswordMatch')) {
      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== this.state.password) {
          return false;
        }
        return true;
      });
    }

    this.state = {
      loading: false,
      name: '',
      email: '',
      facebook: '',
      instagram: '',
      cpf: '',
      password: '',
      password_confirm: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  componentWillUnmount() {
    if (ValidatorForm.hasValidationRule('isPasswordMatch')) {
      ValidatorForm.removeValidationRule('isPasswordMatch')
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({ loading: true })
    let self = this;
    try {
      api.post('api/register', this.state).then((res) => {
        if (res.data.status && !res.data.alertType) {
          const email = this.state.email
          const password = this.state.password
          api.post('api/login', { email, password }).then(async (response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('permission', response.data.permission);
            this.props.history.push('/socio')
          });
        } else {
          self.setState({ loading: false })
          SimpleSwal('<strong>Atenção</strong>',res.data.msg,'warning')         
        }
      }).catch(function (error) {
        self.setState({ loading: false })
        if (error.response) {
          let msg = error.response.data.errors['email'] ? error.response.data.errors['email'][0] : error.response.data.msg
          SimpleSwal('<strong>Atenção</strong>',msg,'warning')         

          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data.msg);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message);
        }
        // console.log(error.config);
      });
    } catch (err) {
      self.setState({ loading: false })
      SimpleNoty('Oops! Falha ao realizar o cadastro!','warning')
    }
  }

  render() {
    return (
      <Container maxWidth="lg">
        <div className="register-container">
          <div className="content card">
            <Grid container>
              <Grid item sm={4}>
                <section>
                  <img src="https://misterins.com.br/wp-content/themes/misterins/assets/images/logo.png" alt="Mister Ins" />
                  <h1>Cadastro</h1>
                  <p className="text-white">Faça seu cadastro, entre na plataforma e aproveite os conteúdos que temos à oferecer.</p><p className="text-danger"><strong>ATENÇÃO! O campo de e-mail deve ser o mesmo utilizado na compra do curso na Hotmart.</strong></p>

                  <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#3498db" />
                    Já possuo cadastro
                  </Link>
                </section>
              </Grid>
              <Grid item sm={8}>
                <ValidatorForm
                  // ref="form"
                  ref={r => (this.form = r)}
                  onSubmit={this.handleSubmit}
                  onError={errors => console.log(errors)}
                >
                  <Grid container>
                    <Grid item sm={6}>
                      <TextValidator
                        label="Nome"
                        variant="outlined"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        validators={['required']}
                        errorMessages={['Por favor, insira seu nome']}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <TextValidator
                        label="Facebook"
                        variant="outlined"
                        type="text"
                        name="facebook"
                        value={this.state.facebook}
                        onChange={this.handleChange}
                        validators={['required']}
                        errorMessages={['Por favor, insira o seu do facebook']}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <TextValidator
                        label="E-mail"
                        variant="outlined"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        validators={['required', 'isEmail']}
                        errorMessages={['Por favor, insira seu e-mail', 'E-mail inválido!']}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <TextValidator
                        label="Instagram"
                        variant="outlined"
                        type="text"
                        name="instagram"
                        value={this.state.instagram}
                        onChange={this.handleChange}
                        validators={['required']}
                        errorMessages={['Por favor, insira o seu @ do instagram']}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <InputMask
                        value={this.state.cpf}
                        onChange={this.handleChange}
                        mask="999.999.999-99"
                        maskChar={null}
                      >
                        {inputProps =>
                          <TextValidator
                            {...inputProps}
                            fullWidth
                            label="CPF"
                            variant="outlined"
                            maxLength={14}
                            name="cpf"
                            validators={['required']}
                            onChange={this.handleChange}
                            errorMessages={['Por favor, insira o seu CPF']}
                          />
                        }
                      </InputMask>
                    </Grid>
                    <Grid item sm={12}>
                      <TextValidator
                        label="Digite uma senha"
                        variant="outlined"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        validators={['required', 'minStringLength:8']}
                        errorMessages={['Por favor, insira uma senha', 'Mínimo 8 caracteres']}
                      />
                      <TextValidator
                        label="Confirme sua senha"
                        variant="outlined"
                        type="password"
                        name="password_confirm"
                        value={this.state.password_confirm}
                        onChange={this.handleChange}
                        validators={['isPasswordMatch', 'required']}
                        errorMessages={['As senhas não parecem ser iguais', 'Por favor, confirme sua senha']}
                      />
                      <Button className="button register" type="submit" disabled={this.state.loading}>
                        {this.state.loading && <span className="inline"><FontAwesomeIcon icon={faSync} spin /> <Typography> Cadastrando...</Typography></span>}
                        {!this.state.loading && <span className="inline"><Typography>Cadastrar</Typography></span>}
                      </Button>
                    </Grid>
                  </Grid>
                </ValidatorForm>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    );
  }
}
export default withRouter(Register);