import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useHistory } from "react-router";
import api from "../../services/api";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { SimpleNoty } from "../../helpers/NotyFeedBack";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

import "./style.css";
import Header from "../../components/Header";
import ListVideos from "../../components/Socio/ListVideos";
import Footer from "../../components/Footer";

export default function Socio() {
  const [items, setItems] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const history = useHistory();
  const [spinner, setSpinner] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    api
      .get("copy", {
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
          setItems(response.data.data);
          setSpinner(false);
        }
      })
      .catch((error) => {
        console.log("Ocorreu um erro ao buscar os items" + error);
      });
  }, [token, history]);

  function handleAffiliate() {
    window.open(
      "https://app-vlc.hotmart.com/affiliate-recruiting/view/2201V44551760"
    );
  }

  function handleProgress(event) {
    setProgress(event);
  }

  return (
    <React.Fragment>
      <div className={"d-flex"}>
        <Header title={"Sócio"} />
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
              <Grid item xs={12} md={12} className="mb-4">
                <Card className="card">
                  <CardContent>
                    <Button
                      title="Seja um afiliado Mister Ins"
                      className="affiliate-button"
                      onClick={handleAffiliate}
                    >
                      <Typography variant="h6">
                        <ThumbUpAltIcon /> Afiliar-se
                      </Typography>
                    </Button>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h6"
                      className="white"
                    >
                      Copy dos Anúncios
                    </Typography>
                    {items.length > 0
                      ? items.map((list) => (
                          <div className="copy" key={list.id}>
                            <Grid item mb={4} md={4} xs={12}>
                              <CopyToClipboard
                                text={list.title}
                                onCopy={() =>
                                  SimpleNoty(
                                    "Sucesso! Título copiado.",
                                    "success"
                                  )
                                }
                              >
                                <Button
                                  className="mb-1"
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                  startIcon={<FileCopyIcon />}
                                >
                                  Copiar
                                </Button>
                              </CopyToClipboard>
                              <Typography className="white">
                                <strong>Título</strong>
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="body2"
                                className="white"
                              >
                                {list.title}
                              </Typography>
                            </Grid>
                            <Grid item mb={4} md={4} xs={12}>
                              <CopyToClipboard
                                text={list.important_text}
                                onCopy={() =>
                                  SimpleNoty(
                                    "Sucesso! Texto principal copiado.",
                                    "success"
                                  )
                                }
                              >
                                <Button
                                  className="mb-1"
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                  startIcon={<FileCopyIcon />}
                                >
                                  Copiar
                                </Button>
                              </CopyToClipboard>
                              <Typography className="white">
                                <strong>Texto Principal</strong>
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                                {list.important_text}
                              </Typography>
                            </Grid>
                            <Grid item mb={4} md={4} xs={12}>
                              <CopyToClipboard
                                text={list.description}
                                onCopy={() =>
                                  SimpleNoty(
                                    "Sucesso! descrição copiada.",
                                    "success"
                                  )
                                }
                              >
                                <Button
                                  className="mb-1"
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                  startIcon={<FileCopyIcon />}
                                >
                                  Copiar
                                </Button>
                              </CopyToClipboard>
                              <Typography className="white">
                                <strong>Descrição</strong>
                              </Typography>
                              <Typography variant="body2">
                                {list.description}
                              </Typography>
                            </Grid>
                          </div>
                        ))
                      : null}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <Card className="card">
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h6"
                      className="white"
                    >
                      Vídeos
                    </Typography>
                    <ListVideos
                      type={"story"}
                      onChange={handleProgress}
                    ></ListVideos>
                    <ListVideos type={"feed"}></ListVideos>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Footer />
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
