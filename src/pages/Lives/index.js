import React, { useState } from 'react'
import { Container, Grid, Card, CardContent, TextField, FormGroup, IconButton } from '@material-ui/core';
import Header from '../../components/Header';
import './styles.css';
import ChatMessage from '../../components/ChatMessage';
import { SendSharp } from '@material-ui/icons';

export default function Lives(onInsert) {
    const [comment, setComment] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        await onInsert({
            "title": comment,
            "status": 0
        });

        setComment("");
    };
    return (
        <React.Fragment>
            <Header />
            <Container className="theme-dark" maxWidth="lg">
                <Grid container>
                    <Grid item sm={12}>
                        <h1>Live</h1>
                    </Grid>
                    <Grid item sm={8}>
                        <iframe width="800vh" height="480px" src="https://www.youtube.com/embed/EpyerKQEWGI?controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="disable-controls"></iframe>
                    </Grid>
                    <Grid item sm={4}>
                        <Card className="min-height-480 card-dark">
                            <CardContent>
                                <h3 className="mr-text-light mr-font-weight-200">Comentários</h3>
                                <div className="comments">
                                    <ChatMessage />
                                </div>
                                <div className="form-inline">
                                    <form autoComplete="off" className="send-comment" onSubmit={handleSubmit}>
                                        <FormGroup display="inline">
                                            <Grid container>
                                                <Grid item sm={10}>
                                                    <TextField
                                                        name="comment"
                                                        id="comment"
                                                        label="Adicionar comentário"
                                                        className="ext-input"
                                                        fullWidth
                                                        value={comment}
                                                        onChange={e => setComment(e.target.value)}
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item sm={2}>
                                                    <IconButton                                                         
                                                        aria-label="add to shopping cart"
                                                        type="submit"
                                                    >
                                                        <SendSharp />
                                                    </IconButton>
                                                    {/* <button type="submit"><SendSharp /></button> */}
                                                </Grid>
                                            </Grid>
                                        </FormGroup>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}