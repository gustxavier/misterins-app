import { Button, CardContent, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useHistory } from "react-router";
import ReactPlayer from "react-player";
import { Card } from "react-bootstrap";

function ListVideos(param) {
  const [items, setItems] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const history = useHistory();
  const [progress, setProgress] = useState(0);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    if (param.onChange) {
      param.onChange(progress);
    }

    if (param.onLoad) {
      param.onLoad(spinner);
    }

    getVideosList();

    async function getVideosList() {
      api
        .get("partnervideo/getVideos/" + param.courseID + "/" + param.type, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.status && response.data.status === (401 || 498)) {
            localStorage.clear();
            history.push("/");
          } else {
            setItems(response.data.data);
            setSpinner(false);
          }
        })
        .catch((error) => {
          localStorage.clear();
          history.push("/");
        });
    }
  }, [param, progress, history, token, spinner]);

  async function download(id, file_name) {
    setProgress(0.1);
    api
      .get("partnervideo/downloadVideo/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          setProgress((progressEvent.loaded * 100) / progressEvent.total);
        },
      })
      .then((response) => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([response.data]));
        link.download = file_name;
        link.click();
        setProgress(0);
      })
      .catch((error) => {
        console.log(error);
        // localStorage.clear();
        // history.push("/");
      });
  }

  return (
    <Grid item xs={12} md={12}>
      <Card className="card mb-4">
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            className="white"
          >
            Vídeos para {items.length > 0 && items[0].type}
          </Typography>
          {items.length > 0 ? (
            <div className="videos mb-4">
              <Grid container>
                <Grid item md={12}></Grid>
                {items.length > 0
                  ? items.map((list) => (
                      <Grid
                        key={list.id}
                        item
                        xs={12}
                        md={2}
                        className="single-video-download"
                      >
                        <div className="player">
                          <ReactPlayer
                            url={
                              "https://api.misterins.com.br/public/storage/" +
                              list.path
                            }
                            width={"100%"}
                          />

                          <Button
                            className="button mt-2"
                            align="center"
                            onClick={() => download(list.id, list.file_name)}
                            endIcon={<GetAppIcon />}
                            title="Download"
                            type="submit"
                          >
                            <span className="inline">
                              <Typography>{list.title}</Typography>
                            </span>
                          </Button>
                        </div>
                      </Grid>
                    ))
                  : null}
              </Grid>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ListVideos;
