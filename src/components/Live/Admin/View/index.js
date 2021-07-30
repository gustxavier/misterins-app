import React from "react";
import api from "../../../../services/api";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import Header from "../../../Header";
import {
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
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import equal from "fast-deep-equal";

import "./styles.css";
import { simpleNoty } from "../../../../helpers/NotyFeedBack";
import Upload from "../Upload";

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id_live: props.match.params.id,
      spinner: true,
      title: "",
      url: "",
      description: "",
      thumbnail: "",
      is_active: "",
      date: "",
      hour: "",
      token: localStorage.getItem("token"),
      courses: [],
      checkedState: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitLive = this.handleSubmitLive.bind(this);
    this.handleSubmitPermission = this.handleSubmitPermission.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleSpinner = this.handleSpinner.bind(this);
    this.handleSwitchActive = this.handleSwitchActive.bind(this);
    this.getLive = this.getLive.bind(this);
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
    this.getLive();
    this.getCourses();
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.match.params.id, prevProps.match.params.id)) {
      // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      this.setState({ id_live: this.props.match.params.id, spinner: true });
      this.getLive();
      this.getCourses();
    }
  }

  getLive() {
    this.setState({ spinner: true });
    api
      .get("lives/" + this.state.id_live, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        console.log();
        if (response.data.status === 401 || response.data.status === 498) {
          localStorage.clear();
          this.props.history.push("/");
        }
        this.setState({
          spinner: false,
          id_live: response.data.data.id,
          title: response.data.data.title,
          url: response.data.data.url,
          description: response.data.data.description,
          thumbnail: response.data.data.thumbnail,
          date: response.data.data.date,
          hour: response.data.data.hour,
          is_active: response.data.data.is_active,
        });
        // return response.data;
      });
  }

  getCourses() {
    this.setState({ spinner: true });
    api
      .get("courses/getCoursesByLive/" + this.state.id_live, {
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

  handleSubmitLive(event) {
    event.preventDefault();
    this.setState({ spinner: true });

    api
      .put("lives/" + this.state.id_live, this.state, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        if (response.data.status && response.data.status === (401 || 498)) {
          localStorage.clear();
          this.props.history.push("/");
        } else {
          simpleNoty("Sucesso! Dados Atualizados.", "success");
          this.setState({ spinner: false });
          this.props.history.push("/admin/live/" + this.state.id_live);
        }
      });
  }

  handleSubmitPermission(event) {
    event.preventDefault();
    this.setState({ spinner: true });
    api
      .put(
        "lives/updateLiveHasCourses/" + this.state.id_live,
        this.state.checkedState,
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === (401 || 498)) {
          localStorage.clear();
          this.props.history.push("/");
        } else {
          simpleNoty("Sucesso! Dados Atualizados.", "success");
          this.setState({ spinner: false });
          this.props.history.push("/admin/lives/" + this.state.id_live);
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

  handleSpinner(event) {
    this.setState({
      spinner: event,
    });
  }

  handleSwitchActive() {
    if (this.state.is_active === "Y") {
      this.setState({ is_active: "N" });
    } else {
      this.setState({ is_active: "Y" });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className={"d-flex"}>
          <Header title={"Live"} />
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
                  <Card className="card" mb={2}>
                    <CardContent>
                      <Typography variant="h6" className="text-white mb-3">
                        Live
                      </Typography>
                      <Grid container>
                        <Grid item sm={6}>
                          <div className="form-check form-switch mb-3">
                            <label
                              className="form-check-label text-white"
                              for="flexSwitchCheckDefault"
                            >
                              Live ativa
                            </label>
                            <input
                              checked={this.state.is_active === "Y" ? true : false}
                              className="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckDefault"
                              onChange={this.handleSwitchActive}
                            />
                          </div>
                          <img
                            className="d-block w-50"
                            src={
                              "https://api.misterins.com.br/public/storage/" +
                              this.state.thumbnail
                            }
                            alt="thumbnail"
                          />
                          <Upload
                            id={this.state.id_live}
                            onSpinner={this.handleSpinner}
                          />
                        </Grid>
                      </Grid>
                      <ValidatorForm
                        ref={(r) => (this.form = r)}
                        onSubmit={this.handleSubmitLive}
                        onError={(errors) => console.log(errors)}
                      >
                        <Grid container>
                          <Grid item sm={6}>
                            <TextValidator
                              label="Título"
                              variant="outlined"
                              type="text"
                              name="title"
                              value={this.state.title}
                              onChange={this.handleChange}
                              validators={["required"]}
                              errorMessages={["Por favor, insira título"]}
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <TextValidator
                              label="Url"
                              variant="outlined"
                              type="text"
                              name="url"
                              value={this.state.url}
                              onChange={this.handleChange}
                              validators={["required"]}
                              errorMessages={[
                                "Por favor, insira a url do vídeo",
                              ]}
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <TextValidator
                              label="Data"
                              variant="outlined"
                              type="date"
                              name="date"
                              // defaultValue="25/11/2018"
                              value={this.state.date}
                              onChange={this.handleChange}
                              validators={["required"]}
                              errorMessages={["Por favor, insira a data"]}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <TextValidator
                              label="Hora"
                              variant="outlined"
                              type="time"
                              name="hour"
                              value={this.state.hour}
                              onChange={this.handleChange}
                              validators={["required"]}
                              errorMessages={["Por favor, insira a hora"]}
                            />
                          </Grid>
                          <Grid item sm={12}>
                            <TextField
                              name="description"
                              id="description"
                              label="Descrição"
                              variant="outlined"
                              multiline
                              rows={2}
                              value={this.state.description}
                              onChange={this.handleChange}
                            />
                            <button
                              className="btn btn-primary mt-2"
                              type="submit"
                            >
                              <Typography> Atualizar dados</Typography>
                            </button>
                          </Grid>
                        </Grid>
                      </ValidatorForm>
                    </CardContent>
                  </Card>
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
                                <button
                                  className="btn btn-primary mt-3"
                                  type="submit"
                                >
                                  <Typography>Atualizar Permissões</Typography>
                                </button>
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    </Grid>
                  </ValidatorForm>
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
