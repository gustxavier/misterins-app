import { Box, Button, Card, CardContent, Container, Grid, List, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useHistory } from "react-router";
import api from "../../services/api";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { SimpleNoty } from "../../helpers/NotyFeedBack"
import { SimpleSwal } from "../../helpers/SwalFeedBack";

import "./style.css"
import Header from "../../components/Header";
import ListVideos from "../../components/Socio/ListVideos";

export default function Socio() {
  const [items, setItems] = useState([]);
  const [token] = useState(localStorage.getItem('token'));
  const history = useHistory();

  useEffect(() => {
    api.get('api/v1/copy', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (!response.data.status && (response.data.status === 401 || response.data.status === 498)) {
        localStorage.clear();
        SimpleSwal('<strong>Atenção</strong>', response.data.message, 'warning');
        history.push('/')
      } else {
        setItems(response.data.data);
      }
    }).catch((error) => {
      console.log("Ocorreu um erro ao buscar os items" + error);
    });
  }, [token, history]);

  return (
    <React.Fragment>
      <Header />
      <Container className="theme-dark" maxWidth="lg">
        <Grid container>
          <Grid item xs={12} md={4}>
            <Card className='card'>
              <CardContent>
                <Typography gutterBottom variant="h4" component="h2" className="white">
                  Copy dos Anúncios
                </Typography>
                <List>
                  {items.length > 0 ? items.map((list) =>
                  (
                    <div className="copy" key={list.id}>
                      <Box mb={3}>
                        <CopyToClipboard text={list.title}
                          onCopy={() => SimpleNoty("Sucesso!", 'success')}>
                          <Button variant="contained" color="secondary" size="small" startIcon={<FileCopyIcon />}>Copiar Título</Button>
                        </CopyToClipboard>
                        <Typography variant="h6" className="white">Título</Typography>
                        <Typography gutterBottom variant="body2" className="white">{list.title}</Typography>
                      </Box>
                      <Box mb={3}>
                        <CopyToClipboard text={list.important_text}
                          onCopy={() => SimpleNoty("Sucesso!", 'success')}>
                          <Button variant="contained" color="secondary" size="small" startIcon={<FileCopyIcon />}>Copiar Texto Principal</Button>
                        </CopyToClipboard>
                        <Typography variant="h6" component="h6" className="white">Texto Principal</Typography>
                        <Typography variant="body2" gutterBottom>{list.important_text}</Typography>
                      </Box>
                      <Box mb={3}>
                        <CopyToClipboard text={list.description}
                          onCopy={() => SimpleNoty("Sucesso!", 'success')}>
                          <Button variant="contained" color="secondary" size="small" startIcon={<FileCopyIcon />}>Copiar Descrição</Button>
                        </CopyToClipboard>
                        <Typography variant="h6" component="h6" className="white">Descrição</Typography>
                        <Typography variant="body2">{list.description}</Typography>
                      </Box>
                    </div>
                  )) : null
                  }
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card className='card'>
              <CardContent>
                <Typography gutterBottom variant="h4" component="h2" className="white">
                  Vídeos
                </Typography>
                  <ListVideos type={'story'}></ListVideos>
                  <ListVideos type={'feed'}></ListVideos>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

// export default withRouter(Socio);