import React from "react"
import { Button, Fab, Grid, Typography } from "@material-ui/core"
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator"
import InputMask from "react-input-mask"
import { simpleNoty } from "../../../helpers/NotyFeedBack"
import { simpleSwal } from "../../../helpers/SwalFeedBack"
import api from "../../../services/api"
import { withRouter } from "react-router-dom"
import AddIcon from "@material-ui/icons/Add"
import ModalHeader from "react-bootstrap/esm/ModalHeader"
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap"
import './style.css'

class InserirCampanha extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      email: "",
      facebook: "",
      instagram: "",
      cpf: "",
      password: "",
      password_confirm: "",
      showModal: false,
      token: localStorage.getItem("token"),
    };

    this.insertuser = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }

  handleChange(event) {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    if (!ValidatorForm.hasValidationRule("isPasswordMatch")) {
      ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
        if (value !== this.state.password) {
          return false;
        }
        return true;
      });
    }
  }

  componentWillUnmount() {
    if (ValidatorForm.hasValidationRule("isPasswordMatch")) {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSpinner(true)
    let self = this;
    try {
      api
        .post("users/admininsert", this.state, {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        })
        .then((res) => {
          if (
            !res.data.status &&
            (res.data.status === 401 || res.data.status === 498)
          ) {
            localStorage.clear();
            self.props.history.push("/");
          }
          self.setState({ showModal: false });
          if (res.data.status && !res.data.alertType) {
            simpleNoty("Usuário inserido", "success");
            self.props.history.push(
              "/admin/usuario/profile/" + res.data.data.id
            );
          } else {
            self.props.onSpinner(false)
          }
        })
        .catch(function (error) {
          self.setState({ showModal: false });
          self.props.onSpinner(false)

          if (error.response) {
            let msg = error.response.data.errors["email"]
              ? error.response.data.errors["email"][0]
              : error.response.data.msg;
            simpleSwal("<strong>Atenção</strong>", msg, "warning");
          } else if (error.request) {
          } else {
          }
        });
    } catch (err) {
      self.setState({ showModal: false });
      self.props.onSpinner(false)
      simpleNoty("Oops! Falha ao realizar o cadastro!", "warning");
    }
    self.setState({ showModal: false });
  }

  modalClose() {
    this.setState({
      showModal: false,
    });
  }

  modalOpen() {
    this.setState({
      showModal: true,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Fab color="primary" aria-label="add" onClick={this.modalOpen}>
          <AddIcon />
        </Fab>
        <Modal show={this.state.showModal} onHide={this.modalClose} size="lg">
          <ModalHeader>
            <ModalTitle>Inserir novo</ModalTitle>
            <button
              type="button"
              className="btn-close"
              onClick={this.modalClose}
            ></button>
          </ModalHeader>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={(errors) => console.log(errors)}
          >
            <ModalBody>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={6}>
                    <TextValidator
                      fullWidth
                      label="Nome"
                      variant="outlined"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      validators={["required"]}
                      errorMessages={["Por favor, insira seu nome"]}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextValidator
                      fullWidth
                      label="Facebook"
                      variant="outlined"
                      type="text"
                      name="facebook"
                      value={this.state.facebook}
                      onChange={this.handleChange}
                      validators={["required"]}
                      errorMessages={["Por favor, insira o seu do facebook"]}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextValidator
                      fullWidth
                      label="E-mail"
                      variant="outlined"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "Por favor, insira seu e-mail",
                        "E-mail inválido!",
                      ]}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextValidator
                      fullWidth
                      label="Instagram"
                      variant="outlined"
                      type="text"
                      name="instagram"
                      value={this.state.instagram}
                      onChange={this.handleChange}
                      validators={["required"]}
                      errorMessages={["Por favor, insira o seu @ do instagram"]}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <InputMask
                      value={this.state.cpf}
                      onChange={this.handleChange}
                      mask="999.999.999-99"
                      maskChar={null}
                    >
                      {(inputProps) => (
                        <TextValidator
                          {...inputProps}
                          fullWidth
                          label="CPF"
                          variant="outlined"
                          maxLength={14}
                          name="cpf"
                          validators={["required"]}
                          onChange={this.handleChange}
                          errorMessages={["Por favor, insira o seu CPF"]}
                        />
                      )}
                    </InputMask>
                  </Grid>
                  <Grid item sm={12}>
                    <TextValidator
                      fullWidth
                      className="mb-4"
                      label="Digite uma senha"
                      variant="outlined"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      validators={["required", "minStringLength:8"]}
                      errorMessages={[
                        "Por favor, insira uma senha",
                        "Mínimo 8 caracteres",
                      ]}
                    />
                    <TextValidator
                      fullWidth
                      label="Confirme sua senha"
                      variant="outlined"
                      type="password"
                      name="password_confirm"
                      value={this.state.password_confirm}
                      onChange={this.handleChange}
                      validators={["isPasswordMatch", "required"]}
                      errorMessages={[
                        "As senhas não parecem ser iguais",
                        "Por favor, confirme sua senha",
                      ]}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </ModalBody>
            <ModalFooter>
              <Button className="button" type="submit">
                <span className="inline">
                  <Typography>Cadastrar</Typography>
                </span>
              </Button>
            </ModalFooter>
          </ValidatorForm>
        </Modal>        
      </React.Fragment>
    );
  }
}

export default withRouter(InserirCampanha);
