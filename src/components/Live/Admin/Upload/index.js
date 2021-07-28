import { Grid, Input, Typography } from "@material-ui/core";
import React from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { ValidatorForm } from "react-material-ui-form-validator";
import PublishIcon from "@material-ui/icons/Publish";
import api from "../../../../services/api";
import { simpleNoty } from "../../../../helpers/NotyFeedBack";
import { simpleSwal } from "../../../../helpers/SwalFeedBack";
import { withRouter } from "react-router-dom";

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      id_live: props.match.params.id,
      thumbnail: "",
      showModal: false,
      token: localStorage.getItem("token"),
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSpinner(true);
    api
      .put("lives/uploadThumbnail/" + this.state.id_live, this.state, {
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
          simpleNoty("Imagem inserida!", "success");
          this.props.onSpinner(false);
          this.props.history.push("/admin/live/" + this.state.id_live);
        }
        this.props.onSpinner(false);
      })
      .catch(function (error) {
        console.log(error)
        this.setState({ showModal: false });
        this.props.onSpinner(false);
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
        <div
          className="btn btn-secondary mt-2 mb-4 text-white"
          aria-label="add"
          onClick={this.modal}
        >
          <PublishIcon /> Editar Thumbnail
        </div>
        <Modal
          show={this.state.showModal}
          onHide={this.modal}
          size="lg"
          className="modal-copy"
        >
          <ModalHeader>
            <ModalTitle>Upload</ModalTitle>
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
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="thumbnail"
                  accept="image/*"
                  onChange={this.onChangeInputFile}
                />
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

export default withRouter(Upload);
