import React from "react";
import { withRouter } from "react-router-dom";
import {
  CircularProgress,
  Container,
  Typography,
  Grid,
  CardContent,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import api from "../../../../services/api";
import Header from "../../../Header";
import { Card } from "react-bootstrap";
import { simpleNoty } from "../../../../helpers/NotyFeedBack";
import { confirmToDelete } from "../../../../helpers/SwalFeedBack";

class CampaignGroupView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      spinner: true,
      token: localStorage.getItem("token"),
      id: props.match.params.id,
      name_group: "",
      campaign_id: "",
      redirect_link: "",
      order: "",
      max_click: "",
      actually_click: "",
    };

    this.getCampaignGroup = this.getCampaignGroup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getCampaignGroup();
  }

  componentDidUpdate() {
    this.setState(null);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  getCampaignGroup() {
    this.setState({ spinner: true });
    api
      .get("campaigngroup/" + this.state.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          name_group: response.data.data.name_group,
          campaign_id: response.data.data.campaign_id,
          redirect_link: response.data.data.redirect_link,
          order: response.data.data.order,
          max_click: response.data.data.max_click,
          actually_click: response.data.data.actually_click,
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ spinner: true });

    api
      .put("campaigngroup/" + this.state.id, this.state, {
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
          this.props.history.push(
            "/admin/mrzap/campaigngroup/" + this.state.id
          );
        }
      });
  }

  confirm() {
    let path = "campaigngroup/" + this.state.id;
    let redirect = "/admin/mrzap/campaign/" + this.state.campaign_id;
    confirmToDelete(this.props, path, redirect);
  }

  render() {
    return (
      <React.Fragment>
        <div className={"d-flex"}>
          <Header title={"Admin - Campanha (Grupo)"} />
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
                          <Typography variant="h6" className="text-white mb-4">
                            Grupo
                          </Typography>
                        </Grid>
                      </Grid>
                      <ValidatorForm
                        ref={(r) => (this.form = r)}
                        onSubmit={this.handleSubmit}
                        onError={(errors) => console.log(errors)}
                      >
                        <Grid item sm={6}>
                          <TextValidator
                            name="name_group"
                            id="name_group"
                            label="Nome"
                            variant="outlined"
                            className="TextFieldBlock"
                            value={this.state.name_group}
                            onChange={this.handleChange}
                            validators={["required"]}
                            errorMessages={[
                              "Por favor, insira o título do grupo",
                            ]}
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <TextValidator
                            name="redirect_link"
                            id="redirect_link"
                            label="Link"
                            variant="outlined"
                            value={this.state.redirect_link}
                            onChange={this.handleChange}
                            validators={["required"]}
                            errorMessages={["Por favor, insira o link"]}
                          />
                        </Grid>
                        <Grid item sm={2}>
                          <TextValidator
                            label="Ordem"
                            variant="outlined"
                            name="order"
                            value={this.state.order}
                            onChange={this.handleChange}
                            validators={["required"]}
                            errorMessages={["Por favor, insira a ordem"]}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item sm={2}>
                          <TextValidator
                            label="Máximo de cliques"
                            variant="outlined"
                            name="max_click"
                            value={this.state.max_click}
                            onChange={this.handleChange}
                            validators={["required"]}
                            errorMessages={[
                              "Por favor, insira a quantidade máxima de cliques",
                            ]}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item sm={2}>
                          <TextValidator
                            label="Quantidade atual"
                            variant="outlined"
                            name="actually_click"
                            value={this.state.actually_click}
                            onChange={this.handleChange}
                            validators={["required"]}
                            errorMessages={[
                              "Por favor, insira a quantidade atual ja clicada",
                            ]}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item sm={12}>
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
export default withRouter(CampaignGroupView);
