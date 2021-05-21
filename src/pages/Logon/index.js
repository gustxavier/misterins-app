import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import Noty from 'noty';

import "../../../node_modules/noty/lib/noty.css";
import "../../../node_modules/noty/lib/themes/metroui.css";

import api from '../../services/api';

import './styles.css';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

class Logon extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  async handleLogin(event) {
    event.preventDefault();

    const email = this.state.email
    const password = this.state.password

    try {
      this.setState({ loading: true })
      const response = await api.post('api/login', { email, password });
      localStorage.setItem('userid', response.data.id);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('useremail', response.data.useremail);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('permission', response.data.permission);
      this.props.history.push('/socio');
    } catch (err) {
      this.setState({ loading: false })
      new Noty({
        text: "Oops! Usuário ou senha inválido!",
        theme: "metroui",
        timeout: 2000,
        progressBar: true,
        type: "warning"
      }).show();
    }
  }

  render() {
    const loading = this.state.loading;
    return (
      <Container maxWidth="lg">
        <div className="logon-container">
          <section className="form card">
            <img src="https://misterins.com.br/wp-content/themes/misterins/assets/images/logo.png" alt="Mister Ins" />
            <ValidatorForm
              // ref="form"
              ref={r => (this.form = r)}
              onSubmit={this.handleLogin}
              onError={errors => console.log(errors)}
            >
              <Grid container>
                <Grid item sm={12}>
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
                  <TextValidator
                    label="Digite uma senha"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    validators={['required']}
                    errorMessages={['Por favor, insira sua senha']}
                  />

                  <Button className="button" type="submit" disabled={loading}>
                    {loading && <span className="inline"><FontAwesomeIcon icon={faSync} spin /> <Typography className="spin"> Entrando...</Typography></span>}
                    {!loading && <span className="inline"><Typography>Entrar</Typography></span>}
                  </Button>

                  <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#3498db" />
                    Não tenho cadastro
                  </Link>
                </Grid>
              </Grid>
            </ValidatorForm>
          </section>
        </div>
      </Container>
    );
  }
}

export default withRouter(Logon);