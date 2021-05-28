import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import Task from '../../components/Task';
// import InsertList from '../../components/InsertList';
// import InsertTask from '../../components/InsertTask';
import { Card, CardContent, Container, Grid } from '@material-ui/core';
import api from '../../services/api';
import InsertLive from '../../components/Live/InsertLive';
import UpdateCopy from '../../components/Forms/Copy/UpdateCopy';
import UpdateLive from '../../components/Live/UpdateLive';

import './styles.css';
import UploadVideo from '../../components/Socio/UploadVideo';
import Header from '../../components/Header';

export default function Admin() {
  const [token] = useState(localStorage.getItem('token'));

  const history = useHistory();

  useEffect(() => {
  }, [token, history]);

  return (
    <React.Fragment>
      <Header />
      <Container className="theme-dark" maxWidth="xl">
        <Grid container>
          {localStorage.getItem('permission') === 'admin' &&
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Card className="bg-dark">
                    <CardContent>
                      <h2 className="mr-text-center mr-text-light">O SÓCIO</h2>
                      <Grid container>
                        <Grid item xs={12} md={6}>
                          <UpdateCopy />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <UploadVideo />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Card className="bg-dark">
                    <CardContent>
                      <h2 className="mr-text-center mr-text-light">Live</h2>
                      <Grid container>
                        {/* <InsertLive /> */}
                        <UpdateLive />
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          }
        </Grid>
      </Container>
    </React.Fragment>
  );
}