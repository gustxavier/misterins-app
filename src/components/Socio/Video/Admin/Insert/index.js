import React from "react";
import {
  FormControl,
  Grid,
  InputLabel,  
  Select,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import "./style.css";
import { simpleNoty } from "../../../../../helpers/NotyFeedBack";
import api from "../../../../../services/api";

class Insert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      course_id: this.props.match.params.id,
      title: "",
      url: "",
      thumbnail: "",
      type: "",
      token: localStorage.getItem("token"),
      showModal: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeInputFile = this.onChangeInputFile.bind(this);
    this.modal = this.modal.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSpinner(true);
    api
      .post("partnervideo", this.state, {
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
          this.props.history.push("/admin/socio/video/" + res.data.data.id);
        }
        this.props.onSpinner(false);
      })
      .catch(function (error) {
        // this.props.onSpinner(false);
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
          className="btn btn-primary mb-3 d-inline"
          aria-label="add"
          onClick={this.modal}
          style={{ float: "right" }}
        >
          <AddIcon /> Adicionar novo
        </button>
        <Modal
          show={this.state.showModal}
          onHide={this.modal}
          size="lg"
          className="modal-video"
        >
          <ModalHeader>
            <ModalTitle>Adicionar novo download</ModalTitle>
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
                <Grid item sm={12}>                  
                  <FormControl
                    variant="outlined"
                    className="form-control"
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Tipo de postagem
                    </InputLabel>
                    <Select
                      native
                      value={this.state.type}
                      onChange={this.handleChange}
                      label="Tipo de postagem"
                      validators={["required"]}
                      errorMessages={["Por favor, selecione um tipo de postagem"]}
                      inputProps={{
                        name: "type",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option aria-label="None" value="0" />
                      <option value={'feed'}>Feed</option>
                      <option value={'story'}>Story</option>
                    </Select>
                  </FormControl>
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
