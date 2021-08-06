import { CardContent, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import api from "../../../services/api";
import "./style.css";

class ListLives extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      token: localStorage.getItem("token"),
      userPermCourses: localStorage.getItem("courses"),
      lives: [],
      livePermission: [],
      items: [],
    };

    this.getLives = this.getLives.bind(this);
    this.getLivePermissions = this.getLivePermissions.bind(this);
    this.setListItems = this.setListItems.bind(this);
  }

  componentDidMount() {
    this.getLives();
    this.getLivePermissions();
  }

  componentDidUpdate() {
    if (
      this.state.lives.length > 0 &&
      this.state.livePermission.length > 0 &&
      this.state.items.length === 0
    ) {
      this.setListItems();
    }
    if (this.state.livePermission.length > 0 && this.state.items.length === 0) {
      this.setState({
        items: JSON.parse(localStorage.getItem("live-permission")),
      });
      this.props.onSpinner(false);
    }
  }

  componentWillUnmount() {
    this.setState({
      items: [],
      lives: [],
      livePermission: [],
    });
  }

  getLives() {
    this.props.onSpinner(true);
    api
      .get("lives", {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((res) => {
        if (res.status === 401 || res.status === 498) {
          localStorage.clear();
          this.props.history.push("/");
        }
        this.setState({ lives: res.data.data });
      });
  }

  getLivePermissions() {
    api
      .get("liveHasCourse", {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((res) => {
        if (res.status === 401 || res.status === 498) {
          localStorage.clear();
          this.props.history.push("/");
        }
        this.setState({ livePermission: res.data.data });
      });
  }

  setListItems() {
    let courses = [];
    this.state.lives.forEach((element) => {
      this.state.livePermission.forEach((el) => {
        element.id === el.live_id
          ? (courses = [
              ...courses,
              { live_id: el.live_id, hotmart_id: el.hotmart_id },
            ])
          : console.log();
      });
    });
    localStorage.setItem("live-permission", JSON.stringify(courses));
  }

  render() {
    return (
      <Container maxWidth="lg" className={"container"}>
        <Grid container>
          <Grid item md={12}>
            <Card className="card">
              <CardContent>
                <Typography variant="h6" className="text-white">
                  Disponíveis
                </Typography>
                <div className="row mt-3">
                  {this.state.lives.length > 0
                    ? this.state.lives.map((listLive) => (
                        <div key={listLive.id} className="col-6 ">
                          {listLive.is_active === "Y" && (
                            <div>
                              {this.state.items.length > 0
                                ? this.state.items.map((listPermission) => (
                                    <div key={listPermission.id}>
                                      {listLive.id ===
                                      listPermission.live_id ? (
                                        <div>
                                          {
                                            this.state.userPermCourses.search(
                                              listPermission.hotmart_id
                                            ) !== -1 ? (
                                              <div className="text-center link-border p-2">
                                                <p className="text-white mb-2">
                                                  {listLive.title}
                                                </p>
                                                <img
                                                  className="d-block w-100 mb-2"
                                                  src={
                                                    "https://api.misterins.com.br/public/storage/" +
                                                    listLive.thumbnail
                                                  }
                                                  alt="thumbnail"
                                                />
                                                <p className="text-white mb-2">
                                                  {listLive.date_formated}
                                                </p>
                                                <p className="text-white mb-2">
                                                  {listLive.hour}
                                                </p>
                                                <a
                                                  className="live-link btn btn-primary"
                                                  href={"/live/" + listLive.id}
                                                  title="Asisstir Live"
                                                >
                                                  Assistir Live
                                                </a>
                                              </div>
                                            ) : null
                                          }
                                        </div>
                                      ) : null}
                                    </div>
                                  ))
                                : null}
                            </div>
                          )}
                        </div>
                      ))
                    : null}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(ListLives);
