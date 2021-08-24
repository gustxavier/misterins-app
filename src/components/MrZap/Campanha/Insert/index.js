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

class InserirCampanha extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      slug: "",
      start: "",
      end: "",
      showModal: false,
      token: localStorage.getItem("token"),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.modal = this.modal.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSpinner(true);
    api
      .post("campaign", this.state, {
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
          simpleNoty("Sucesso! Campanha Inserida", "success");
          this.props.history.push("/admin/mrzap/campaign/" + res.data.data.id);
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
          <AddIcon /> Adicionar nova
        </button>
        <Modal show={this.state.showModal} onHide={this.modal} size="lg">
          <ModalHeader>
            <ModalTitle>Inserir nova</ModalTitle>
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
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      validators={["required"]}
                      errorMessages={["Por favor, insira seu nome"]}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextValidator
                      fullWidth
                      label="Slug (ex.: campanha-de-julho)"
                      variant="outlined"
                      type="text"
                      name="slug"
                      value={this.state.slug}
                      onChange={this.handleChange}
                      validators={["required"]}
                      errorMessages={["Por favor, insira o slug (url)"]}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextValidator
                      fullWidth
                      label="Data de início"
                      variant="outlined"
                      type="date"
                      name="start"
                      value={this.state.start}
                      onChange={this.handleChange}
                      validators={["required"]}
                      errorMessages={["Por favor, insira a data de início"]}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextValidator
                      fullWidth
                      label="Data de término"
                      variant="outlined"
                      type="date"
                      name="end"
                      value={this.state.end}
                      onChange={this.handleChange}
                      validators={["required"]}
                      errorMessages={[
                        "Por favor, insira a data de término da campanha",
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

export default withRouter(InserirCampanha);
