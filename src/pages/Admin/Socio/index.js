import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
} from "@material-ui/core";
import api from "../../../services/api";
import UpdateCopy from "../../../components/Socio/UpdateCopy";
import UploadVideo from "../../../components/Socio/UploadVideo";
import Header from "../../../components/Header";
import "./styles.css";

export default function Copy() {
  const [token] = useState(localStorage.getItem("token"));
  const [spinner, setSpinner] = useState(false);
  const history = useHistory();

  useEffect(() => {}, [token, history]);

  return (
    <React.Fragment>
      <div className={"d-flex"}>
        <Header title={"Admin - Sócio"} />
        <main className={"content-dark"}>
          <div className={"app-bar-spacer"} />
          {spinner && (
            <div id="spinner-live" className="spinner">
              <CircularProgress />
            </div>
          )}
          <Container maxWidth="xl" className={"container"}>
            <Grid container>
              {localStorage.getItem("permission") === "admin" && (
                <Grid item xs={12} md={12}>
                  <Card className="card">
                    <Grid container>
                      <Grid item xs={12} md={12}>
                        <CardContent>
                          <h2 className="mr-text-center mr-text-light">
                            O SÓCIO
                          </h2>
                          <Grid container>
                            <Grid item xs={12} md={6}>
                              <UpdateCopy />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <UploadVideo />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Grid>

                      {/* <Grid item xs={12} md={5}>
                      <Card className="card">
                        <CardContent>
                          <h2 className="mr-text-center mr-text-light">Live</h2>
                          <Grid container>
                            {/* <InsertLive /> }
                            <UpdateLive />
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid> */}
                    </Grid>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
