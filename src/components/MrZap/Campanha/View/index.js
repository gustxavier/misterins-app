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
import { DataGrid, ptBR, GridToolbar } from "@material-ui/data-grid";
import { confirmToDelete } from "../../../../helpers/SwalFeedBack";
import { simpleNoty } from "../../../../helpers/NotyFeedBack";
import InsertGroup from "../../Grupos/Insert";

class CampaignView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      token: localStorage.getItem("token"),
      spinner: true,
      name: "",
      slug: "",
      start: "",
      end: "",
      items: [],
      pageSize: 50,
      columns: [
        { field: "id", headerName: "#", width: 90 },
        { field: "name_group", headerName: "Nome", width: 300 },
        { field: "redirect_link", headerName: "Link", width: 450 },
        { field: "max_click", headerName: "Máx. de cliques", width: 190 },
        { field: "actually_click", headerName: "Clique atual", width: 180 },
        { field: "order", headerName: "Ordem", width: 120 },
      ],
    };

    this.getCampaign = this.getCampaign.bind(this);
    this.getCampaignGroup = this.getCampaignGroup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSpinner = this.handleSpinner.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  componentDidMount() {
    this.getCampaign();
    this.getCampaignGroup();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSpinner(event) {
    this.setState({
      spinner: event,
    });
  }

  getCampaign() {
    this.setState({ spinner: true });
    api
      .get("campaign/" + this.state.id, {
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
          id: response.data.data.id,
          name: response.data.data.name,
          slug: response.data.data.slug,
          start: response.data.data.start,
          end: response.data.data.end,
        });
      });
  }

  getCampaignGroup() {
    this.setState({ spinner: true });
    api
      .get("campaigngroup/getByCampaignID/" + this.state.id, {
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
          items: response.data.data,
        });
      });
  }

  handlePageSizeChange(event) {
    this.setState({ pageSize: event.pageSize });
  }

  handleRowClick(params) {
    this.props.history.push({
      pathname: "/admin/mrzap/campaigngroup/" + params.row.id,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ spinner: true });

    api
      .put("campaign/" + this.state.id, this.state, {
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
          this.props.history.push("/admin/mrzap/campaign/" + this.state.id);
        }
      });
  }

  confirm() {
    let path = "campaign/" + this.state.id;
    let redirect = "/admin/mrzap/campanha/";
    confirmToDelete(this.props, path, redirect);
  }

  render() {
    return (
      <React.Fragment>
        <div className={"d-flex"}>
          <Header title={"Admin - Campanha"} />
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
                            Campanha
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
                            name="name"
                            id="name"
                            label="Nome"
                            variant="outlined"
                            className="TextFieldBlock"
                            value={this.state.name}
                            onChange={this.handleChange}
                            validators={["required"]}
                            errorMessages={[
                              "Por favor, insira o título da copy",
                            ]}
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <TextValidator
                            name="slug"
                            id="slug"
                            label="Slug"
                            variant="outlined"
                            value={this.state.slug}
                            onChange={this.handleChange}
                            validators={["required"]}
                            errorMessages={["Por favor, insira o slug"]}
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <TextValidator
                            label="Data de Início"
                            variant="outlined"
                            type="date"
                            name="start"
                            value={this.state.start}
                            onChange={this.handleChange}
                            validators={["required"]}
                            errorMessages={[
                              "Por favor, insira a data de início da campanha",
                            ]}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <TextValidator
                            label="Data de Término"
                            variant="outlined"
                            type="date"
                            name="end"
                            // defaultValue="25/11/2018"
                            value={this.state.end}
                            onChange={this.handleChange}
                            validators={["required"]}
                            errorMessages={[
                              "Por favor, insira a data de fim da campanha",
                            ]}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <button className="btn btn-primary ms-2" type="submit">
                          <span className="inline">
                            <Typography>Atualizar</Typography>
                          </span>
                        </button>
                        {/* <button
                          type="reset"
                          className="btn btn-danger"
                          onClick={() => this.confirm()}
                        >
                          Excluir
                        </button> */}
                      </ValidatorForm>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Card className="card mt-4">
                    <CardContent>
                      <Typography variant="h6" className="text-white d-inline">
                        Grupos
                      </Typography>
                      <InsertGroup
                        onSpinner={this.handleSpinner}
                        campaign_id={this.state.id}
                      />
                      <div style={{ height: "100%", width: "100%" }}>
                        <DataGrid
                          rows={this.state.items}
                          columns={this.state.columns}
                          pagination
                          pageSize={this.state.pageSize}
                          localeText={ptBR.props.MuiDataGrid.localeText}
                          onPageSizeChange={this.handlePageSizeChange}
                          autoHeight={true}
                          onRowClick={this.handleRowClick}
                          components={{
                            Toolbar: GridToolbar,
                          }}
                          filterModel={{
                            items: [
                              {
                                columnField: "",
                                operatorValue: "",
                                value: "",
                              },
                            ],
                          }}
                        />
                      </div>
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
export default withRouter(CampaignView);
