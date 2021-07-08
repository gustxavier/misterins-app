import React from "react";
import { withRouter } from "react-router-dom";

import api from "../../../services/api";

import "./styles.css";
import {
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { SimpleNoty } from "../../../helpers/NotyFeedBack";

class Recouver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      hash: props.match.params.hash,
      password: "",
      password_confirm: "",
      return: false,
      icon: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckLinkExpired = this.handleCheckLinkExpired.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ spinner: true });
    let self = this
    api
      .post("recouver-password", this.state)
      .then((res) => {
        if (res.data.status) {
          SimpleNoty(
            "Senha atualizada com sucesso. Você já pode acessar a plataforma com sua nova senha!",
            "success"
          );
          self.props.history.push("/");
        } else {
          SimpleNoty(
            "Oops! Falha ao renovar sua senha. Entre em contato com o adminsitrador do sistema",
            "danger"
          );
          self.props.history.push("/");
        }
      })
      .catch(function (error) {
        self.setState({ spinner: false });
        if (error) {
          console.log(error);
        }
      });
  }

  componentDidMount() {
    this.handleCheckLinkExpired();

    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  handleCheckLinkExpired() {
    api
      .get("check-link-recouver-password/" + this.state.hash)
      .then((res) => {
        if (res.data.status) {
          this.setState({
            spinner: false,
            return: res.data.msg,
            icon: res.data.icon,
          });
        }
      })
      .catch((res) => {
        console.log("err. " + res);
      });
  }

  componentWillUnmount() {
    if (ValidatorForm.hasValidationRule("isPasswordMatch")) {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    }
  }

  render() {
    return (
      <Container maxWidth="lg">
        <div className="recouver-container">
          {this.state.spinner && (
            <div id="spinner-live" className="spinner">
              <CircularProgress />
            </div>
          )}
          {!this.state.return ? (
            <section className="form card">
              <div className="row m-0 mb-2">
                <div className="col-md-4 pb-1 bg-dark"></div>
                <div className="col-md-4 pb-1 bg-primary"></div>
                <div className="col-md-4 pb-1 bg-danger"></div>
              </div>
              <ValidatorForm
                ref={(r) => (this.form = r)}
                onSubmit={this.handleSubmit}
              >
                <Grid container>
                  <Grid item sm={12}>
                    <Typography
                      className="text-white text-center mb-4 mt-0"
                      variant="h6"
                    >
                      Nova senha
                    </Typography>
                    <TextValidator
                      label="Digite uma senha"
                      variant="outlined"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      validators={["required", "matchRegexp:^.{8,}$"]}
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
                    />
                    <Button className="button" type="submit">
                      <span className="inline">
                        <Typography>Salvar</Typography>
                      </span>
                    </Button>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </section>
          ) : (
            <div>
              <Grid container>
                <Grid item sm={12}>
                  <img
                    src="https://misterins.com.br/wp-content/themes/misterins/assets/images/logo.png"
                    alt="Mister Ins"
                  />
                  <Typography
                    className="text-white text-center mb-4 mt-5"
                    variant="h5"
                  >
                    {this.state.return}
                  </Typography>
                  <div>
                    <div className="text-center">
                      <HighlightOffOutlinedIcon
                        fontSize="large"
                        className="icon-danger mt-4"
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </Container>
    );
  }
}

export default withRouter(Recouver);
