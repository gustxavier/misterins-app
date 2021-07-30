import {
  Container,
  Grid,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import "./style.css";
import Header from "../../components/Header";
import ListVideos from "../../components/Socio/ListVideos";
import Footer from "../../components/Footer";
import { useHistory, useParams } from "react-router-dom";
import ViewListCopies from "../../components/Socio/Copy/View/index.js";
import api from "../../services/api";

export default function Socio() {
  const param = useParams();
  const courseID = param.id;
  const [spinner, setSpinner] = useState(false);
  const [progress, setProgress] = useState(0);
  const token = localStorage.getItem("token");
  const history = useHistory();
  const [pagename, setPagename] = useState();

  useEffect(() => {
    api
      .get("courses/" + courseID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (
          !response.data.status &&
          (response.data.status === 401 || response.data.status === 498)
        ) {
          localStorage.clear();
          history.push("/");
        } else {
          setPagename(response.data.data.title);
        }
      })
      .catch((error) => {
        console.log("Ocorreu um erro ao buscar os items" + error);
      });
  }, [history, param, token, courseID]);

  function handleProgress(event) {
    setProgress(event);
  }

  function handleSpinner(event) {
    setSpinner(event);
  }

  return (
    <React.Fragment>
      <div className={"d-flex"}>
        <Header title={"Sócio - " + pagename} />
        <main className={"content-dark"}>
          <div className={"app-bar-spacer"} />
          {spinner && (
            <div id="spinner-live" className="spinner">
              <CircularProgress />
            </div>
          )}
          {progress > 0 ? (
            <div className="download-progress">
              <LinearProgress
                variant="determinate"
                color="secondary"
                value={progress}
              />
            </div>
          ) : null}
          <Container maxWidth="xl" className={"container"}>
            <Grid container>
              <ViewListCopies courseID={param.id} />
              <ListVideos
                courseID={param.id}
                type={"story"}
                onChange={handleProgress}
                onLoad={handleSpinner}
              ></ListVideos>
              <ListVideos
                courseID={param.id}
                type={"feed"}
                onChange={handleProgress}
              ></ListVideos>
            </Grid>
            <Footer />
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
