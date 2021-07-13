import React from "react"
import { Link, withRouter } from "react-router-dom"
import { FiLogIn } from "react-icons/fi"
import api from "../../../services/api"

import "./styles.css"
import {
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@material-ui/core"
import Footer from "../../../components/Footer"
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator"
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined"
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined'

class Reset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      email: "",
      return: false,
      icon: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ spinner: true });
    let self = this
    api
      .post("forgot-password", this.state)
      .then((res) => {
        if (res.data.status) {
          self.setState({
            spinner: false,
            return: res.data.msg,
            icon: res.data.icon,
          });
        }
      })
      .catch(function (error) {
        self.setState({ spinner: false });
        if (error) {
          console.log(error);
        }
      });
  }

  render() {
    return (
      <Container maxWidth="lg">
        <div className="reset-container">
          {this.state.spinner && (
            <div id="spinner-live" className="spinner">
              <CircularProgress />
            </div>
          )}
          {!this.state.return ? (
            <section className="form card">
              <div className="row m-0 mb-2">
                <div className="col-md-4 pb-1 bg-dark"></div>
                <div className="col-md-4 pb-1 bg-primary"></div>
                <div className="col-md-4 pb-1 bg-danger"></div>
              </div>
              <ValidatorForm
                ref={(r) => (this.form = r)}
                onSubmit={this.handleSubmit}
              >
                <Grid container>
                  <Grid item sm={12}>
                    <Typography
                      className="text-white text-center mb-4 mt-0"
                      variant="h6"
                    >
                      Digite seu e-mail
                    </Typography>
                    <TextValidator
                      label="E-mail"
                      variant="outlined"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "Por favor, insira seu e-mail",
                        "E-mail inválido!",
                      ]}
                    />
                    <Button className="button" type="submit">
                      <span className="inline">
                        <Typography>Avançar</Typography>
                      </span>
                    </Button>
                    <Link className="back-link" to="/">
                      <FiLogIn size={16} color="#3498db" />
                      voltar para login
                    </Link>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </section>
          ) : (
            <div>
              <Grid container>
                <Grid item sm={12}>
                  <img
                    src="https://misterins.com.br/wp-content/themes/misterins/assets/images/logo.png"
                    alt="Mister Ins"
                  />
                  <Typography
                    className="text-white text-center mb-4 mt-5"
                    variant="h5"
                  >
                    {this.state.return}
                  </Typography>
                  <div>
                    <div className="text-center">
                      {this.state.icon === "info" && (
                        <InfoOutlinedIcon
                          fontSize="large"
                          className="icon-info mt-4"
                        />
                      )}
                      {this.state.icon === "success" && (
                        <CheckCircleOutlineOutlinedIcon
                          fontSize="large"
                          className="icon-success mt-4"
                        />
                      )}
                      {this.state.icon === "warning" && (
                        <ReportProblemOutlinedIcon
                          fontSize="large"
                          className="icon-warning mt-4"
                        />
                      )}
                      {this.state.icon === "danger" && (
                        <HighlightOffOutlinedIcon
                          fontSize="large"
                          className="icon-danger mt-4"
                        />
                      )}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
        <Footer />
      </Container>
    );
  }
}

export default withRouter(Reset);
