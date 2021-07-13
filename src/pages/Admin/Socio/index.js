import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardContent, Container, Grid } from "@material-ui/core";
import UpdateCopy from "../../../components/Socio/UpdateCopy";
import UploadVideo from "../../../components/Socio/UploadVideo";
import InsertCopy from "../../../components/Socio/InsertCopy";
import Header from "../../../components/Header";
import "./styles.css";
import Footer from "../../../components/Footer";
import { CircularProgress } from "@material-ui/core";

export default function Copy() {
  const [token] = useState(localStorage.getItem("token"));
  const history = useHistory();
  const [spinner, setEventSpinner] = useState(false);

  function handleSpinner(event) {
    setEventSpinner(event);
  }

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
                              <InsertCopy />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <UpdateCopy onSpinner={handleSpinner} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <UploadVideo />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              )}
            </Grid>
            <Footer />
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
