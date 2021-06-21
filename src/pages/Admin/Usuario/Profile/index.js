import React from "react";
import api from "../../../../services/api";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { SimpleNoty } from "../../../../helpers/NotyFeedBack";
import "./styles.css";

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
      courses: [],
      checkedItems: new Map(),
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
    this.getUserInfo()
    this.getCourses()
  }

  getUserInfo(){
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

  getCourses(){
    api
      .get("api/v1/courses/getCoursesByUser/" + this.state.id_user, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        console.log(response)
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
          courses: response.data.all
        });
        return response.data;
      });
  }

  componentWillUnmount() {
    if (ValidatorForm.hasValidationRule("isPasswordMatch")) {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    }
  }

  handleSubmitUpdateUser(event) {
    event.preventDefault();
    this.setState({ spinner: true });

    api
      .put("api/v1/users/" + this.state.id_user, this.state, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        if (response.data.status && response.data.status === (401 || 498)) {
          localStorage.clear();
          SimpleSwal(
            "<strong>Atenção</strong>",
            response.data.message,
            "warning"
          );
          this.props.history.push("/");
        } else {
          SimpleNoty("Sucesso! Dados Atualizados.", "success");
          this.setState({ spinner: false });
          this.props.history.push("/admin/usuario/profile");
        }
      });
  }

  handleSubmitNewPassword(event) {
    event.preventDefault();
    this.setState({ spinner: true });

    api
      .put("api/v1/users/updatePassword/" + this.state.id_user, this.state, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        if (response.data.status && response.data.status === (401 || 498)) {
          localStorage.clear();
          SimpleSwal(
            "<strong>Atenção</strong>",
            response.data.message,
            "warning"
          );
          this.props.history.push("/");
        } else {
          SimpleNoty("Sucesso! Dados Atualizados.", "success");
          this.setState({ spinner: false });
          this.props.history.push("/admin/usuario/profile");
        }
      });
  }

  handleSubmitPermission(event) {}

  handleChangeCheckbox(event) {
    let isChecked = event.target.checked;
    let item = event.target.value;

    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
  }

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
                      <Card className="card" mb={2}>
                        <CardContent>
                          <Grid container>
                            <Grid item sm={12}>
                              <Typography className="text-center">
                                <AccountCircleIcon
                                  fontSize={"large"}
                                  style={{ color: "#fafafa" }}
                                  className="icon-profile"
                                />
                              </Typography>
                            </Grid>
                          </Grid>
                          <ValidatorForm
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
                                <Button className="button" type="submit">
                                  <Typography> Atualizar dados</Typography>
                                </Button>
                              </Grid>
                              {/* <Grid item sm={12}>
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
                            /> 
                          </Grid> */}
                            </Grid>
                          </ValidatorForm>
                        </CardContent>
                      </Card>
                      <ValidatorForm
                        ref={(r) => (this.form = r)}
                        onSubmit={this.handleSubmitNewPassword}
                        onError={(errors) => console.log(errors)}
                      >
                        <Grid container>
                          <Grid item sm={12}>
                            <Accordion className="change-password">
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography className={"heading"}>
                                  ALTERAR SENHA
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Grid container>
                                  <Grid item sm={4}>
                                    <TextValidator
                                      label="Nova senha"
                                      variant="outlined"
                                      type="password"
                                      name="password"
                                      value={this.state.password}
                                      onChange={this.handleChange}
                                      validators={[
                                        "required",
                                        "minStringLength:8",
                                      ]}
                                      errorMessages={[
                                        "Por favor, insira uma senha",
                                        "Mínimo 8 caracteres",
                                      ]}
                                    />
                                  </Grid>
                                  <Grid item sm={4}>
                                    <TextValidator
                                      label="Repita sua nova senha"
                                      variant="outlined"
                                      type="password"
                                      name="password_confirm"
                                      value={this.state.password_confirm}
                                      onChange={this.handleChange}
                                      validators={[
                                        "isPasswordMatch",
                                        "required",
                                      ]}
                                      errorMessages={[
                                        "As senhas não parecem ser iguais",
                                        "Por favor, confirme sua senha",
                                      ]}
                                    />
                                  </Grid>
                                  <Grid item sm={4}>
                                    <Button
                                      className="button btn-inline"
                                      type="submit"
                                    >
                                      <Typography>Salvar</Typography>
                                    </Button>
                                  </Grid>
                                </Grid>
                              </AccordionDetails>
                            </Accordion>
                          </Grid>
                        </Grid>
                      </ValidatorForm>
                      <ValidatorForm
                        ref={(r) => (this.form = r)}
                        onSubmit={this.handleSubmitPermission}
                        onError={(errors) => console.log(errors)}
                      >
                        <Grid container>
                          <Grid item sm={12}>
                            <Accordion className="permissions">
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography className={"heading"}>
                                  PERMISSÕES / CURSOS
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Grid container>
                                  <Grid item sm={12}>
                                    {this.state.courses.length > 0 ? this.state.courses.map((item) => (
                                      <FormGroup row>
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={true}
                                              onChange={this.handleChangeCheckbox}
                                              name="coursesChecked"
                                              value={item.id}
                                              color="primary"
                                            />
                                          }
                                          label={item.title}
                                        />
                                    </FormGroup>
                                     
                                    )): null}
                                  </Grid>
                                  <Grid item sm={4}>
                                    <Button
                                      className="button btn-inline"
                                      type="submit"
                                    >
                                      <Typography>Atualizar</Typography>
                                    </Button>
                                  </Grid>
                                </Grid>
                              </AccordionDetails>
                            </Accordion>
                          </Grid>
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
