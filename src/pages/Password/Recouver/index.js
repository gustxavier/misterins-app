import React from "react";
import {withRouter} from "react-router-dom";

import api from "../../../services/api";

import "./styles.css";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

class Recouver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      hash: props.match.params.hash,
      password: "",
      password_confirm: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      this.setState({ loading: true });
      
    } catch (err) {
      this.setState({ loading: false });
    }
  }

  handleClick(event) {
    this.props.history.push("/register");
  }

  componentDidMount() {
    console.log(this.state.hash)
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    if (ValidatorForm.hasValidationRule("isPasswordMatch")) {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    }
  }

  render() {
    return (
      <Container maxWidth="xl">
        <div className="logon-container">
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
                  <Typography className="text-white text-center mb-4 mt-0" variant="h6">Nova senha</Typography>
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
        </div>
      </Container>
    );
  }
}

export default withRouter(Recouver);
