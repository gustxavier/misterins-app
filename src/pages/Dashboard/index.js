import { Card, CardContent, Typography } from "@material-ui/core";
import { CircularProgress, Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./style.css";
import cachimbo from '../../assets/images/cachimbo.png';


export default function Dashboard() {
  const [spinner, setSpinner] = useState(false);
  return (
    <React.Fragment>
      <div className={"d-flex"}>
        <Header title={"Dashboard"} />
        <main className={"content-dark"}>
          <div className={"app-bar-spacer"} />
          {spinner && (
            <div id="spinner-live" className="spinner">
              <CircularProgress />
            </div>
          )}
          <Container maxWidth="lg" className={"container"}>
            <Grid container>
              <Grid item md={12}>
                <Card className="card">
                  <CardContent>
                    <Typography variant="h1" align="center">
                      Olá, seja bem-vindo!
                    </Typography>
                    <img className="image-cachimbo"
                      src={cachimbo}
                      alt="mister-ins"
                    />
                    <Typography variant="h4" align="center" className="white" style={{maxWidth: '60%', margin: 'auto'}}>
                      Trabalhamos diariamente para oferecer um serviço de
                      qualidade para nossos clientes. Aproveite nossa
                      plataforma.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
