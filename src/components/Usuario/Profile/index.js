import React from "react";
import api from "../../../services/api";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import Header from "../../Header";
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
  Checkbox,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { SimpleNoty } from "../../../helpers/NotyFeedBack";
import equal from "fast-deep-equal";

import "./styles.css";

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id_user: props.match.params.id,
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
      checkedState: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitUpdateUser = this.handleSubmitUpdateUser.bind(this);
    this.handleSubmitNewPassword = this.handleSubmitNewPassword.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleSubmitPermission = this.handleSubmitPermission.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getCourses = this.getCourses.bind(this);
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
    this.setState({ spinner: true });
    this.getUserInfo();
    this.getCourses();
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.match.params.id, prevProps.match.params.id)) {
      // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      this.setState({ id_user: this.props.match.params.id, spinner: true });
      this.getUserInfo();
      this.getCourses();
    }
  }

  getUserInfo() {
    this.setState({ spinner: true });
    api
      .get("users/" + this.state.id_user, {
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

  getCourses() {
    this.setState({ spinner: true });
    api
      .get("courses/getCoursesByUser/" + this.state.id_user, {
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
          this.props.history.push("/");
        }
        this.setState({
          spinner: false,
          courses: response.data.data.all,
        });

        response.data.data.all.forEach((element) => {
          response.data.data.checked.forEach((el) => {
            element.id === el.course_id
              ? this.setState((prevState) => ({
                  checkedState: [...prevState.checkedState, el.course_id],
                }))
              : console.log();
          });
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
      .put("users/" + this.state.id_user, this.state, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        if (response.data.status && response.data.status === (401 || 498)) {
          localStorage.clear();
          this.props.history.push("/");
        } else {
          SimpleNoty("Sucesso! Dados Atualizados.", "success");
          this.setState({ spinner: false });
          this.props.history.push(
            "/admin/usuario/profile/" + this.state.id_user
          );
        }
      });
  }

  handleSubmitNewPassword(event) {
    event.preventDefault();
    this.setState({ spinner: true });

    api
      .put("users/updatePassword/" + this.state.id_user, this.state, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        if (response.data.status && response.data.status === (401 || 498)) {
          localStorage.clear();
          this.props.history.push("/");
        } else {
          SimpleNoty("Sucesso! Dados Atualizados.", "success");
          this.setState({ spinner: false });
          this.props.history.push(
            "/admin/usuario/profile/" + this.state.id_user
          );
        }
      });
  }

  handleSubmitPermission(event) {
    event.preventDefault();
    this.setState({ spinner: true });

    api
      .put(
        "users/updateUserHasCourses/" + this.state.id_user,
        this.state.checkedState,
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status && response.data.status === (401 || 498)) {
          localStorage.clear();
          this.props.history.push("/");
        } else {
          SimpleNoty("Sucesso! Dados Atualizados.", "success");
          this.setState({ spinner: false });
          this.props.history.push(
            "/admin/usuario/profile/" + this.state.id_user
          );
        }
      });
  }

  handleChangeCheckbox(position) {
    let arrayChecked = this.state.checkedState;

    if (arrayChecked.includes(position)) {
      // Se encontrar a posição quer dizer que já existe, então removemos o valor do array
      arrayChecked.splice(arrayChecked.indexOf(position), 1);
      this.setState({ checkedState: [...arrayChecked] });
    } else {
      // caso contrário quer dizer que não existe, então adiciona
      this.setState((prevState) => ({
        checkedState: [...prevState.checkedState, position],
      }));
    }
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
                            </Grid>
                          </ValidatorForm>
                        </CardContent>
                      </Card>
                      <ValidatorForm
                        ref={(r) => (this.form = r)}
                        onSubmit={this.handleSubmitNewPassword}
                        // onError={(errors) => console.log(errors)}
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
                                        "matchRegexp:^.{8,}$",
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
                      {localStorage.getItem("permission") === "admin" && (
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
                                      {this.state.courses.length > 0
                                        ? this.state.courses.map((item) => (
                                            <FormGroup row key={item.id}>
                                              <FormControlLabel
                                                control={
                                                  <Checkbox
                                                    checked={
                                                      this.state.checkedState.includes(
                                                        item.id
                                                      )
                                                        ? true
                                                        : false
                                                    }
                                                    onChange={() =>
                                                      this.handleChangeCheckbox(
                                                        item.id
                                                      )
                                                    }
                                                    name="checkedCourses"
                                                    color="primary"
                                                  />
                                                }
                                                label={item.title}
                                              />
                                            </FormGroup>
                                          ))
                                        : null}
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
                      )}
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
