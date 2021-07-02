import React from "react";
import api from "../../services/api";

import {
  Button,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router";
import { SimpleNoty } from "../../helpers/NotyFeedBack";
import { SimpleSwal } from "../../helpers/SwalFeedBack";
import { Card } from "@material-ui/core";

class UpdateLive extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      spinner: true,
      id: "",
      title: "",
      url: "",
      description: "",
      course_id: "",
      courses: [],
      token: localStorage.getItem("token"),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getCourses();
    this.getLive(1);
  }

  getLive($id) {
    api
      .get("lives/" + $id, {
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
          title: response.data.data.title,
          url: response.data.data.url,
          description: response.data.data.description,
          course_id: response.data.data.course_id,
          spinner: false
        });
        // return response.data;
      });
  }

  getCourses() {
    api
    .get("courses", {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => {
        if (
          response.data.status &&
          (response.data.status === 401 || response.data.status === 498)
        ) {
          return response.data.status;
        }
        this.setState({
          courses: response.data.data,
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true, spinner: true });

    api
      .put("lives/1", this.state, {
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
          SimpleNoty("Sucesso! Live Atualizada.", "success");
          this.setState({ loading: false, spinner: false });
          this.props.history.push("/admin/live");
        }
      });
  }

  handleChange(event) {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({
      [event.target.name]: value,
    });
  }

  render() {
    return (
      <div>
        {this.state.spinner && (
          <div id="spinner-live" className="spinner">
            <CircularProgress />
          </div>
        )}
        <Container maxWidth="xl" className={"container"}>
          <Grid container>
            <Card></Card>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} md={12}>
                  <Card className="card">
                    <CardContent>
                      <h2 className="mr-text-center mr-text-light">Live</h2>
                      <Grid container>
                        <div className="form card">
                          <Typography>
                            <strong>Atualizar Live</strong>
                          </Typography>
                          <ValidatorForm
                            onSubmit={this.handleSubmit}
                            onError={(errors) => console.log(errors)}
                          >
                            <Grid container>
                              <Grid item sm={12}>
                                <TextValidator
                                  name="title"
                                  id="title"
                                  label="Título"
                                  variant="outlined"
                                  className="TextFieldBlock"
                                  value={this.state.title}
                                  onChange={this.handleChange}
                                  validators={["required"]}
                                  errorMessages={[
                                    "Por favor, insira o título do vídeo",
                                  ]}
                                />
                                <TextValidator
                                  name="url"
                                  id="url"
                                  label="URL"
                                  variant="outlined"
                                  className="TextFieldBlock"
                                  value={this.state.url}
                                  onChange={this.handleChange}
                                  validators={["required"]}
                                  errorMessages={["Por favor, a URL do vídeo"]}
                                />
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
                                <FormControl variant="outlined">
                                  <InputLabel id="demo-simple-select-outlined-label">
                                    Permissão para assistir
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    name="course_id"
                                    value={this.state.course_id}
                                    onChange={this.handleChange}
                                    label="Permissão para assistir"
                                  >
                                    {this.state.courses.length > 0
                                      ? this.state.courses.map(
                                          (list, index) => (
                                            <MenuItem
                                              key={index}
                                              value={list.id}
                                            >
                                              {list.title}
                                            </MenuItem>
                                          )
                                        )
                                      : null}
                                  </Select>
                                </FormControl>
                                <Button
                                  className="button"
                                  type="submit"
                                  disabled={this.state.loading}
                                >
                                  {this.state.loading && (
                                    <span className="inline">
                                      <FontAwesomeIcon icon={faSync} spin />{" "}
                                      <Typography> Atualizando...</Typography>
                                    </span>
                                  )}
                                  {!this.state.loading && (
                                    <span className="inline">
                                      <Typography>Atualizar</Typography>
                                    </span>
                                  )}
                                </Button>
                              </Grid>
                            </Grid>
                          </ValidatorForm>
                        </div>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withRouter(UpdateLive);