import React from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import "./style.css";
import api from "../../../../../services/api";
import { simpleNoty } from "../../../../../helpers/NotyFeedBack";
import { simpleSwal } from "../../../../../helpers/SwalFeedBack";

class Insert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      title: "",
      importante_text: "",
      description: "",
      course_id: this.props.match.params.id,
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSpinner(true);
    let self = this;
    try {
      api
        .post("copy", this.state, {
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
            self.props.history.push("/");
          }
          self.setState({ showModal: false });
          if (res.data.status && !res.data.alertType) {
            simpleNoty("Copy inserida!", "success");
            self.props.onSpinner(false);
            self.props.history.push("/admin/socio/" + this.state.course_id);
          } else {
            self.props.onSpinner(false);
          }
        })
        .catch(function (error) {
          self.setState({ showModal: false });
          self.props.onSpinner(false);

          if (error.response) {
            let msg = error.response.data.errors["email"]
              ? error.response.data.errors["email"][0]
              : error.response.data.msg;
            simpleSwal("<strong>Atenção</strong>", msg, "warning");
          }
        });
    } catch (err) {
      self.setState({ showModal: false });
      self.props.onSpinner(false);
      simpleNoty("Oops! Falha ao realizar o cadastro!", "warning");
    }
    self.setState({ showModal: false });
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
        <Modal
          show={this.state.showModal}
          onHide={this.modal}
          size="lg"
          className="modal-copy"
        >
          <ModalHeader>
            <ModalTitle>Inserir nova copy</ModalTitle>
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
              <Grid container>
                <Grid item sm={12}>
                  <p className="text-dark">
                    <i>Atenção! Não é permitido inserir emoticon.</i>
                  </p>
                  <TextValidator
                    name="title"
                    id="title"
                    label="Título"
                    variant="outlined"
                    className="TextFieldBlock  mb-3 mt-2"
                    value={this.state.title}
                    onChange={this.handleChange}
                    validators={["required"]}
                    errorMessages={["Por favor, insira o título da copy"]}
                  />
                  <TextValidator
                    name="important_text"
                    id="important_text"
                    label="Texto Importante"
                    variant="outlined"
                    className="TextFieldBlock mb-3"
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
                    className="TextFieldBlock"
                    multiline
                    rows={2}
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
            </ModalBody>
            <ModalFooter>
              <button
                type="button"
                className="btn btn-secondary mt-0"
                onClick={this.modal}
              >
                Cancelar
              </button>
              <button className="btn btn-primary" type="submit">
                <span className="inline">
                  <Typography>Cadastrar</Typography>
                </span>
              </button>
            </ModalFooter>
          </ValidatorForm>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(Insert);
