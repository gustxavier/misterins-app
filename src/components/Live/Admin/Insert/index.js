import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { simpleNoty } from "../../../../helpers/NotyFeedBack";
import api from "../../../../services/api";
import "./style.css";

class Insert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      title: "",
      url: "",
      description: "",
      thumbnail: "",
      date: "",
      hour: "",
      token: localStorage.getItem("token"),
      showModal: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeInputFile = this.onChangeInputFile.bind(this);
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
    api
      .post("lives", this.state, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 401 || res.data.status === 498) {
          localStorage.clear();
          this.props.history.push("/");
        }
        if (res.data.alertType) {
          simpleNoty(res.data.msg, res.data.alertType);
        } else {
          this.setState({ showModal: false });
          simpleNoty("Sucesso! Live inserida!", "success");
          this.props.history.push("/admin/live/" + res.data.data.id);
        }
        this.props.onSpinner(false);
      })
      .catch(function (error) {
        this.props.onSpinner(false);
        simpleNoty(
          "Oops! Falha ao realizar o cadastro! Entre em contato com o administrador.",
          "danger"
        );
      });

    this.setState({ showModal: false });
  }

  
  onChangeInputFile(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;

    let reader = new FileReader();

    reader.onload = (e) => {
      this.setState({
        thumbnail: e.target.result,
      });
    };
    reader.readAsDataURL(files[0]);
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
          className="modal-live"
        >
          <ModalHeader>
            <ModalTitle>Adicionar nova live</ModalTitle>
            <button
              type="button"
              className="btn-close"
              onClick={this.modal}
            ></button>
          </ModalHeader>
          <ValidatorForm
            onSubmit={this.handleSubmit}
            onError={(errors) => console.log(errors)}
          >
            <ModalBody>
              <Grid container>
                <Grid item sm={6}>
                  <TextValidator
                    label="Título"
                    className="w-100"
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
                    className="w-100"
                    variant="outlined"
                    type="text"
                    name="url"
                    value={this.state.url}
                    onChange={this.handleChange}
                    validators={["required"]}
                    errorMessages={["Por favor, insira a url do vídeo"]}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextValidator
                    label="Data"
                    className="w-100"
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
                    className="w-100"
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
                  <label className="form-label">Thumbnail</label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="thumbnail"
                    accept="image/*"
                    onChange={this.onChangeInputFile}
                  />
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    name="description"
                    className="w-100"
                    id="description"
                    label="Descrição"
                    variant="outlined"
                    multiline
                    rows={2}
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
            </ModalBody>
            <ModalFooter>
              <div className="btn btn-secondary mt-0" onClick={this.modal}>
                Cancelar
              </div>
              <button className="btn btn-primary" type="submit">
                Adicionar
              </button>
            </ModalFooter>
          </ValidatorForm>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(Insert);
