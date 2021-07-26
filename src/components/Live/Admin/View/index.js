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
  TextField,
} from "@material-ui/core";
import equal from "fast-deep-equal";
import { simpleNoty } from "../../../../../helpers/NotyFeedBack";

import "./styles.css";
import api from "../../../../../services/api";
import Header from "../../../../Header";
import { confirmToDelete } from "../../../../../helpers/SwalFeedBack";

class View extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id_copy: props.match.params.id,
      spinner: true,
      title: "",
      important_text: "",
      course_id: "",
      description: "",
      token: localStorage.getItem("token"),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCopy = this.getCopy.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    this.setState({ spinner: true });
    this.getCopy();
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.match.params.id, prevProps.match.params.id)) {
      this.setState({ id_copy: this.props.match.params.id, spinner: true });
      this.getCopy();
    }
  }

  getCopy() {
    this.setState({ spinner: true });
    api
      .get("copy/" + this.state.id_copy, {
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
          id_copy: response.data.data.id,
          title: response.data.data.title,
          important_text: response.data.data.important_text,
          description: response.data.data.description,
          course_id: response.data.data.course_id,
        });
        // return response.data;
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ spinner: true });

    api
      .put("copy/" + this.state.id_copy, this.state, {
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
          this.props.history.push("/admin/socio/copy/" + this.state.id_copy);
        }
      });
  }

  confirm() {
    let path = "copy/" + this.state.id_copy;
    let redirect = "/admin/socio/" + this.state.course_id;
    confirmToDelete(this.props, path, redirect);
  }

  render() {
    return (
      <React.Fragment>
        <div className={"d-flex"}>
          <Header title={"Admin - Copy"} />
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
                            Copy
                          </Typography>
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
                              className="TextFieldBlock"
                              value={this.state.title}
                              onChange={this.handleChange}
                              validators={["required"]}
                              errorMessages={[
                                "Por favor, insira o título da copy",
                              ]}
                            />
                            <TextValidator
                              name="important_text"
                              id="important_text"
                              label="Texto Importante"
                              variant="outlined"
                              multiline
                              rows={2}
                              value={this.state.important_text}
                              onChange={this.handleChange}
                              validators={["required"]}
                              errorMessages={[
                                "Por favor, insira o texto mais importante da copy",
                              ]}
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
