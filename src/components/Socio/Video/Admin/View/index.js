import {
  Grid,
  Typography,
  Button,
  CardContent,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useHistory } from "react-router-dom";
import { simpleNoty } from "../../../../../helpers/NotyFeedBack";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

import api from "../../../../../services/api";
import { Card } from "react-bootstrap";

export default function ViewListCopies(params) {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");
  const history = useHistory();
  const [linkButton, setLinkButton] = useState();

  useEffect(() => {
    setLinkAffiliate();

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
        }
      })
      .catch((error) => {
        console.log("Ocorreu um erro ao buscar os items" + error);
      });

    async function setLinkAffiliate() {
      switch (Number(params.courseID)) {
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
    }
  }, [token, history, linkButton, params]);

  return (
    <Grid item xs={12} md={12} className="mb-4">
      <Card className="card">
        <CardContent>
          <a
            title="Seja um afiliado Mister Ins"
            className="affiliate-button btn"
            href={linkButton}
            target="_blank"
            rel="noreferrer"
          >
            <Typography variant="h6">
              <ThumbUpAltIcon /> Afiliar-se
            </Typography>
          </a>
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
                        simpleNoty("Sucesso! Título copiado.", "success")
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
                        simpleNoty(
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
                        simpleNoty("Sucesso! descrição copiada.", "success")
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
