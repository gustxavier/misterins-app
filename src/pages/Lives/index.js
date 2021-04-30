import React from 'react'
import { Container, Grid, Card, CardContent } from '@material-ui/core';
import Header from '../../components/Header';
import { PusherProvider } from 'react-pusher-hoc';
import Pusher from 'pusher-js';
import './styles.css';

export default function Lives() {
    const pusherClient = new Pusher('1197059', {
        cluster: 'us2',
        auth: {
            params: { 
                email: 'bar',
                password: 'bar',
            },
            headers: { Authorization: 'boo' }
        }
    });

    return (
        <React.Fragment>
            <Header />
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item sm={12}>
                        <h1>Live</h1>
                    </Grid>
                    <Grid item sm={8}>
                        <iframe width="800vh" height="480px" src="https://www.youtube.com/embed/EpyerKQEWGI?controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="disable-controls"></iframe>
                    </Grid>
                    <Grid item sm={4}>
                        <Card className="min-height-480">
                            <CardContent>
                                <h3 className="mr-text-dark">Comentários</h3>
                                <hr />
                                <div className="comments">
                                    <PusherProvider value={pusherClient}>
                                        
                                    </PusherProvider>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}