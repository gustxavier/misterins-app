import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import {
  CardContent,
  CircularProgress,
  Container,
  Typography,
  Grid,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import equal from "fast-deep-equal";
import { simpleNoty } from "../../../../../helpers/NotyFeedBack";

import api from "../../../../../services/api";
import Header from "../../../../Header";
import { confirmToDelete } from "../../../../../helpers/SwalFeedBack";
import Upload from "../../../../Live/Admin/Upload";

class View extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      spinner: true,
      id_video: props.match.params.id,
      course_id: "",
      title: "",
      url: "",
      thumbnail: "",
      type: "",
      token: localStorage.getItem("token"),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getVideo = this.getVideo.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    this.setState({ spinner: true });
    this.getVideo();
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.match.params.id, prevProps.match.params.id)) {
      this.setState({ id_video: this.props.match.params.id, spinner: true });
      this.getVideo();
    }
  }

  getVideo() {
    this.setState({ spinner: true });
    api
      .get("partnervideo/" + this.state.id_video, {
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
          id_video: response.data.data.id,
          title: response.data.data.title,
          url: response.data.data.url,
          thumbnail: response.data.data.thumbnail,
          type: response.data.data.type,
          course_id: response.data.data.course_id,
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ spinner: true });

    api
      .put("partnervideo/" + this.state.id_video, this.state, {
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
          this.props.history.push("/admin/socio/video/" + this.state.id_video);
        }
      });
  }

  confirm() {
    let path = "partnervideo/" + this.state.id_video;
    let redirect = "/admin/socio/" + this.state.course_id;
    confirmToDelete(this.props, path, redirect);
  }

  render() {
    return (
      <React.Fragment>
        <div className={"d-flex"}>
          <Header title={"Admin - Video"} />
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
                      <Grid container>
                        <Grid item sm={12}>
                          <Typography variant="h5" className="text-white mb-4">
                            Vídeo
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item sm={6}>
                          <img
                            className="d-block w-50"
                            src={
                              "https://api.misterins.com.br/public/storage/" +
                              this.state.thumbnail
                            }
                            alt="thumbnail"
                          />
                          <Upload
                            id={this.state.id_video}
                            onSpinner={this.handleSpinner}
                          />
                        </Grid>
                      </Grid>
                      <ValidatorForm
                        ref={(r) => (this.form = r)}
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
                              className="TextFieldBlock mb-2"
                              value={this.state.title}
                              onChange={this.handleChange}
                              validators={["required"]}
                              errorMessages={["Por favor, insira o título"]}
                            />
                            <TextValidator
                              name="url"
                              id="url"
                              label="URL"
                              variant="outlined"
                              className="mb-2"
                              value={this.state.url}
                              onChange={this.handleChange}
                              validators={["required"]}
                              errorMessages={[
                                "Por favor, insira a url para download",
                              ]}
                            />
                            <FormControl variant="outlined">
                              <InputLabel id="demo-simple-select-outlined-label">
                                Tipo de Postagem
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={this.state.type}
                                name="type"
                                validators={["required"]}
                                className="mb-3"
                                onChange={this.handleChange}
                                label="Tipo de postagem"
                              >
                                <MenuItem value={"feed"}>Feed</MenuItem>
                                <MenuItem value={"story"}>Storys</MenuItem>
                              </Select>
                            </FormControl>
                            <button className="btn btn-primary" type="submit">
                              <span className="inline">
                                <Typography>Atualizar</Typography>
                              </span>
                            </button>
                            <button
                              type="reset"
                              className="btn btn-danger"
                              onClick={() => this.confirm()}
                            >
                              Excluir
                            </button>
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
export default withRouter(View);
