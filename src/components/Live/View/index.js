import React from "react";
import api from "../../../services/api";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import Header from "../../Header";
import InputMask from "react-input-mask";
import {
  Button,
  CardContent,
  CircularProgress,
  Container,
  Typography,
  Grid,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { simpleNoty } from "../../../helpers/NotyFeedBack";
import equal from "fast-deep-equal";

import "./styles.css";
import { Paper } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id_live: props.match.params.id,
      spinner: true,
      title: "",
      url: "",
      description: "",
      courses: [],
      checkedState: [],
    };

    this.getLiveInfo = this.getLiveInfo.bind(this);
    this.getCourses = this.getCourses.bind(this);
  }

  componentDidMount() {
    this.getLiveInfo();
    this.getCourses();
  }

  getLiveInfo() {
    this.setState({ spinner: true });
    api
      .get("lives/" + this.state.id_live, {
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
          id_live: response.data.data.id,
          title: response.data.data.title,
          url: response.data.data.url,
          description: response.data.data.description,
        });
        // return response.data;
      });
  }

  getCourses() {
    this.setState({ spinner: true });
    api
      .get("courses/getCoursesByLive/" + this.state.id_live, {
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
          courses: response.data.data.all,
        });

        response.data.data.all.forEach((element) => {
          response.data.data.checked.forEach((el) => {
            element.id === el.course_id
              ? this.setState((prevState) => ({
                  checkedState: [...prevState.checkedState, el.course_id],
                }))
              : console.log();
          });
        });
        return response.data;
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className={"d-flex"}>
          <Header title={"Live"} />
          <main className={"content-dark"}>
            <div className={"app-bar-spacer"} />
            {this.state.spinner && (
              <div id="spinner-live" className="spinner">
                <CircularProgress />
              </div>
            )}
            <Container maxWidth="lg" className={"container"}>
              <Grid container spacing={3}>
                {localStorage.getItem('courses').search(448026) !== -1 ? (
                  <Grid item sm={12} xs={12} md={12}>
                    <Paper className="paper">
                      {/* <Alert variant="outlined" severity="info">
                      Para fazer uma pergunta acesse o instagram do Maico
                      (maicoandrade) e faça uma pergunta nas caixinhas do
                      storys.
                    </Alert> */}
                      <Typography
                        variant="h5"
                        align="center"
                        style={{ color: "#fafafa" }}
                        className="mb-2"
                      >
                        {this.state.title}
                      </Typography>
                      <iframe
                        width="100%"
                        height="600px"
                        src={this.state.url}
                        title="Live"
                        frameborder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <Typography>{this.state.description}</Typography>
                    </Paper>
                  </Grid>
                ) : (
                  <Grid item sm={12} xs={12}>
                    <Paper className="paper">
                      <Alert variant="outlined" severity="warning">
                        Nenhuma live disponível. Se você ouviu rumores sobre
                        live e não está vendo, provavelmente a live é fechada
                        para alunos de um determinado curso.
                      </Alert>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Container>
          </main>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(Profile);
