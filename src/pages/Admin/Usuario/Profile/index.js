import React, { useState } from "react";
import api from "../../../../services/api";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SimpleSwal } from "../../../../helpers/SwalFeedBack";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import Header from "../../../../components/Header";
import InputMask from "react-input-mask";
import {
  Button,
  CardContent,
  CircularProgress,
  Container,
  Typography,
  Grid,
  Card,
} from "@material-ui/core";
import { SimpleNoty } from "../../../../helpers/NotyFeedBack";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    if (!ValidatorForm.hasValidationRule("isPasswordMatch")) {
      ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
        if (value !== this.state.password) {
          return false;
        }
        return true;
      });
    }

    this.state = {
      id_user: props.location.state.id,
      spinner: true,
      name: "",
      email: "",
      facebook: "",
      instagram: "",
      cpf: "",
      password: "",
      password_confirm: "",
      token: localStorage.getItem("token"),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitUpdateUser = this.handleSubmitUpdateUser.bind(this);
    this.handleSubmitNewPassword = this.handleSubmitNewPassword.bind(this);
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
    api
      .get("api/v1/users/" + this.state.id_user, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        if (
          response.data.status &&
          (response.data.status === 401 || response.data.status === 498)
        ) {
          localStorage.clear();
          SimpleSwal(
            "<strong>Atenção</strong>",
            response.data.message,
            "warning"
          );
          this.props.history.push("/");
        }
        this.setState({
          spinner: false,
          id_user: response.data.data.id,
          name: response.data.data.name,
          email: response.data.data.email,
          facebook: response.data.data.facebook,
          instagram: response.data.data.instagram,
          cpf: response.data.data.cpf,
        });
        // return response.data;
      });
  }

  componentWillUnmount() {
    if (ValidatorForm.hasValidationRule("isPasswordMatch")) {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    }
  }

  handleSubmitUpdateUser(event) {
    // event.preventDefault();
    // this.setState({ loading: true });
    // let self = this;
    // try {
    //   api
    //     .post("api/register", this.state)
    //     .then((res) => {
    //       if (res.data.status && !res.data.alertType) {
    //         const email = this.state.email;
    //         const password = this.state.password;
    //       }
    //     })
    //     .catch(function (error) {
    //       self.setState({ loading: false });
    //       if (error.response) {
    //         let msg = error.response.data.errors["email"]
    //           ? error.response.data.errors["email"][0]
    //           : error.response.data.msg;
    //         SimpleSwal("<strong>Atenção</strong>", msg, "warning");

    //         // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         // console.log(error.response.data.msg);
    //         // console.log(error.response.status);
    //         // console.log(error.response.headers);
    //       } else if (error.request) {
    //         // The request was made but no response was received
    //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //         // http.ClientRequest in node.js
    //         // console.log(error.request);
    //       } else {
    //         // Something happened in setting up the request that triggered an Error
    //         // console.log('Error', error.message);
    //       }
    //       // console.log(error.config);
    //     });
    // } catch (err) {
    //   self.setState({ loading: false });
    //   SimpleNoty("Oops! Falha ao realizar o cadastro!", "warning");
    // }
  }

  handleSubmitNewPassword(event) {}

  render() {
    return (
      <React.Fragment>
        <div className={"d-flex"}>
          <Header title={"Perfil"} />
          <main className={"content-dark"}>
            <div className={"app-bar-spacer"} />
            {this.state.spinner && (
              <div id="spinner-live" className="spinner">
                <CircularProgress />
              </div>
            )}
            <Container maxWidth="lg" className={"container"}>
              <Grid container>
                <Grid item xs={12}>
                  <Card className="card">
                    <CardContent>
                      <ValidatorForm
                        // ref="form"
                        ref={(r) => (this.form = r)}
                        onSubmit={this.handleSubmitUpdateUser}
                        onError={(errors) => console.log(errors)}
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
                              validators={["required"]}
                              errorMessages={["Por favor, insira seu nome"]}
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
                              validators={["required"]}
                              errorMessages={[
                                "Por favor, insira o seu do facebook",
                              ]}
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
                              validators={["required", "isEmail"]}
                              errorMessages={[
                                "Por favor, insira seu e-mail",
                                "E-mail inválido!",
                              ]}
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
                              validators={["required"]}
                              errorMessages={[
                                "Por favor, insira o seu @ do instagram",
                              ]}
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
                                  errorMessages={[
                                    "Por favor, insira o seu CPF",
                                  ]}
                                />
                              )}
                            </InputMask>
                            <Button className="button register" type="submit">
                              <Typography> Atualizar dados</Typography>
                            </Button>
                          </Grid>
                          <Grid item sm={12}>
                            {/* <TextValidator
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
                            /> */}
                          </Grid>
                        </Grid>
                      </ValidatorForm>
                      <ValidatorForm
                        // ref="form"
                        ref={(r) => (this.form = r)}
                        onSubmit={this.handleSubmitNewPassword}
                        onError={(errors) => console.log(errors)}
                      >
                        <Grid container>
                          <Grid item sm={6}></Grid>
                        </Grid>
                      </ValidatorForm>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </main>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(Profile);
