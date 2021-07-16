import {
  Grid,
  Typography,
  Button,
  CircularProgress,
  CardContent,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useHistory, useParams } from "react-router-dom";
import { SimpleNoty } from "../../helpers/NotyFeedBack";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

import api from "../../services/api";
import { Card } from "react-bootstrap";

export default function ListCopies(params) {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");
  const history = useHistory();
  const [spinner, setSpinner] = useState(true);
  const [linkButton, setLinkButton] = useState();

  useEffect(() => {
    api
      .get("copy/getCopyByCourseID/" + params.courseID, {
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
  }, [token, history, params]);

  function handleAffiliate(courseID) {
    switch (Number(courseID)) {
      case 11:
        setLinkButton(
          "https://app-vlc.hotmart.com/affiliate-recruiting/view/2201V44551760"
        );
        break;
      case 12:
        setLinkButton(
          "https://app-vlc.hotmart.com/affiliate-recruiting/view/4497O55977725"
        );
        break;

      default:
        break;
    }
    window.open(linkButton);
  }

  return (
    <Grid item xs={12} md={12} className="mb-4">
      <Card className="card">
        <CardContent>
          <Button
            title="Seja um afiliado Mister Ins"
            className="affiliate-button"
            onClick={() => handleAffiliate(params.courseID)}
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
                        SimpleNoty("Sucesso! Título copiado.", "success")
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
                    <Typography gutterBottom variant="body2" className="white">
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
                        SimpleNoty("Sucesso! descrição copiada.", "success")
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
                    <Typography variant="body2">{list.description}</Typography>
                  </Grid>
                </div>
              ))
            : null}
        </CardContent>
      </Card>
    </Grid>
  );
}
