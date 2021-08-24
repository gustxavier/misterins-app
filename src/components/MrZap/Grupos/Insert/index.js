import React from "react";
import { Grid } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import "./style.css";
import { simpleNoty } from "../../../../helpers/NotyFeedBack";
import api from "../../../../services/api";

class InserirGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      campaign_id: props.match.params.id,
      name_group: "",
      redirect_link: "",
      order: "",
      max_click: "",
      showModal: false,
      token: localStorage.getItem("token"),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.modal = this.modal.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate() {
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSpinner(true);
    api
      .post("campaigngroup", this.state, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((res) => {
        if (
          !res.data.status &&
          (res.data.status === 401 || res.data.status === 498)
        ) {
          localStorage.clear();
          this.props.history.push("/");
        }
        this.setState({ showModal: false });
        if (res.data.alertType) {
          simpleNoty(res.data.msg, res.data.alertType);
        } else {
          simpleNoty("Sucesso! Grupo Inserido", "success");
          this.props.history.push({
            pathname: "/admin/mrzap/campaign/" + this.state.campaign_id,
          });
        }
        this.props.onSpinner(false);
      })
      .catch(function (error) {
        this.setState({ showModal: false });
        this.props.onSpinner(false);
        simpleNoty(
          "Oop! Não foi possível inserir. Entre em contato com o administrador",
          "danger"
        );
      });

    this.setState({ showModal: false });
  }

  modal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  render() {
    return (
      <React.Fragment>
        <button
          color="primary"
          aria-label="add"
          className="btn btn-primary mb-3 d-inline"
          onClick={this.modal}
          style={{ float: "right" }}
        >
          <AddIcon /> Adicionar novo
        </button>
        <Modal show={this.state.showModal} onHide={this.modal} size="lg">
          <ModalHeader>
            <ModalTitle>Inserir novo</ModalTitle>
            <button
              type="button"
              className="btn-close"
              onClick={this.modal}
            ></button>
          </ModalHeader>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={(errors) => console.log(errors)}
          >
            <ModalBody>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={6}>
                    <TextValidator
                      fullWidth
                      label="Nome"
                      variant="outlined"
                      type="text"
                      name="name_group"
                      value={this.state.name_group}
                      onChange={this.handleChange}
                      validators={["required"]}
                      errorMessages={["Por favor, insira o nome do grupo"]}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextValidator
                      fullWidth
                      label="Link de Redirecionamento"
                      variant="outlined"
                      type="text"
                      name="redirect_link"
                      value={this.state.redirect_link}
                      onChange={this.handleChange}
                      validators={["required"]}
                      errorMessages={[
                        "Por favor, insira o link de redirecionamento",
                      ]}
                    />
                  </Grid>
                  <Grid item sm={2}>
                    <TextValidator
                      fullWidth
                      label="Ordem"
                      variant="outlined"
                      type="text"
                      name="order"
                      value={this.state.order}
                      onChange={this.handleChange}
                      validators={["required"]}
                      errorMessages={["Por favor, insira a ordem do grupo"]}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <TextValidator
                      fullWidth
                      label="Máximo de cliques"
                      variant="outlined"
                      type="text"
                      name="max_click"
                      value={this.state.max_click}
                      onChange={this.handleChange}
                      validators={["required"]}
                      errorMessages={[
                        "Por favor, insira a quantidade máxima de cliques no link",
                      ]}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </ModalBody>
            <ModalFooter>
              <div className="btn btn-secondary mt-0" onClick={this.modal}>
                Cancelar
              </div>
              <button className="btn btn-primary" type="submit">
                Finalizar
              </button>
            </ModalFooter>
          </ValidatorForm>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(InserirGroup);
