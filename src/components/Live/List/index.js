import { CardContent, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import api from "../../../services/api";

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
      this.state.lives !== "undefined" &&
      this.state.livePermission !== "undefined" &&
      this.state.items === "undefined"
    ) {
      console.log(localStorage.getItem("live-permission"));
      this.setListItems();
    }

    if (
      localStorage.getItem("live-permission") !== null &&
      this.state.items === "undefined"
    ) {
      this.setState({
        items: JSON.parse(localStorage.getItem("live-permission")),
      });
    }

    console.log(this.state.items)
  }

  getLives() {
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
          ? //courses.splice(1, 0, [el.live_id, el.hotmart_id])
            //push({live_id: el.live_id,hotmart_id: el.hotmart_id})
            (courses = [
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
                  Lives Ativas
                </Typography>
                {/* {this.state.lives.length > 0
                  ? this.state.lives.map((listLive) => (
                      <div key={listLive.id} className="d-inline">
                        {listLive.is_active === "Y" && (
                          <div>
                            {this.state.items.length > 0
                              ? this.state.items.map((listPermission) => (
                                  <div key={listPermission.id}>
                                    {listLive.id === listPermission.live_id ? (
                                      <div>
                                        {this.state.userPermCourses.search(
                                          listPermission.live_id
                                        ) !== -1 ? (
                                          <div></div>
                                        ) : null}
                                      </div>
                                    ) : null}
                                    <p>
                                      {listPermission.live_id + listLive.id}
                                    </p>
                                  </div>
                                ))
                              : null}
                          </div>
                           <a href={"/live/" + list.id}>
                          <Grid item md="6" className="mb-3 text-center">
                            <p className="text-white mb-2">{list.title}</p>
                            <img
                              className="d-block w-100"
                              src={
                                "https://api.misterins.com.br/public/storage/" +
                                list.thmbnail
                              }
                              alt="thumbnail"
                            />
                          </Grid>
                        </a>  
                        )}
                      </div>
                    ))
                  : null} */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(ListLives);
