// import React, { useState } from 'react';
// import {makeStyles} from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Header from '../../components/Header';
// import Sidebar from '../../components/Sidebar';
// import { Card, CardContent, Container, FormGroup, Grid, IconButton, TextField } from '@material-ui/core';
// import { SendSharp } from '@material-ui/icons';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   toolbar: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));

// export default function Lives(onInsert) {
//   const [comment, setComment] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     await onInsert({
//       "title": comment,
//       "status": 0
//     });

//     setComment("");
//   };

//   const classes = useStyles();

//   return (
//     <React.Fragment>
//       {/* <div className={classes.root}> */}
//         <CssBaseline />
//         <Header />  
//         {/* <Sidebar />       */}
//         <main className={classes.content}>
//           <div className={classes.toolbar} />
//           <Container className="theme-dark" maxWidth="lg">
//              <Grid container>
//                  <Grid item sm={12}>
//                      <h1>Live</h1>
//                  </Grid>
//                  <Grid item sm={8}>
//                      <iframe width="800vh" height="480px" src="https:www.youtube.com/embed/EpyerKQEWGI?controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="disable-controls"></iframe>
//                  </Grid>
//                  <Grid item sm={4}>
//                      <Card className="min-height-480 card-dark">
//                          <CardContent>
//                              <h3 className="mr-text-light mr-font-weight-200">Comentários</h3>
//                              <div className="comments">
//                                  {/* <ChatMessage /> */}
//                              </div>
//                              <div className="form-inline">
//                                  <form autoComplete="off" className="send-comment" onSubmit={handleSubmit}>
//                                      <FormGroup display="inline">
//                                          <Grid container>
//                                              <Grid item sm={10}>
//                                                  <TextField
//                                                      name="comment"
//                                                      id="comment"
//                                                      label="Adicionar comentário"
//                                                      className="ext-input"
//                                                      fullWidth
//                                                      value={comment}
//                                                      onChange={e => setComment(e.target.value)}
//                                                      required
//                                                  />
//                                              </Grid>
//                                              <Grid item sm={2}>
//                                                  <IconButton                                                         
//                                                      aria-label="add to shopping cart"
//                                                      type="submit"
//                                                  >
//                                                      <SendSharp />
//                                                  </IconButton>
//                                                  {/* <button type="submit"><SendSharp /></button> */}
//                                              </Grid>
//                                          </Grid>
//                                      </FormGroup>
//                                  </form>
//                              </div>
//                          </CardContent>
//                      </Card>
//                  </Grid>
//              </Grid>
//          </Container>
//         </main>
//       {/* </div> */}
//     </React.Fragment>    
//   )
// }


import React, { useEffect, useState } from 'react'
import { Container, Grid, Card, CardContent, TextField, FormGroup, IconButton } from '@material-ui/core';
import './styles.css';
import ChatMessage from '../../components/ChatMessage';
import { SendSharp } from '@material-ui/icons';
import Header from '../../components/Header';
import api from '../../services/api';
import { SimpleSwal } from '../../helpers/SwalFeedBack';
import { SimpleNoty } from '../../helpers/NotyFeedBack';
import { forEach } from 'lodash';

export default function Lives() {
  const [comment, setComment] = useState("")
  const userid = localStorage.getItem('userid')
  const token = localStorage.getItem('token')

/**
 * TODO parei aqui
 */

  useEffect(() => {
    api.get('api/v1/live-comment', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    ).then(response => {
      if (response.data.status && response.data.status === (401 || 498)) {
        localStorage.clear();
        SimpleSwal('<strong>Atenção</strong>', response.data.message, 'warning')
        this.props.history.push('/')
      } else {
        console.log(response.data.data)
        SimpleNoty('Sucesso!', 'success')        
        document.getElementById('comments').html(formatHtmlQuestion(response.data.data))
      }
    });
  }, [token]);


  function handleSubmit(event){
    event.preventDefault()
    
    const data = {
      'user_id' : event.target.user_id.value,
      'live_id' : 1,
      'comment' : event.target.comment.value
    }

    api.post('api/v1/live-comment', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    ).then(response => {
      if (response.data.status && response.data.status === (401 || 498)) {
        localStorage.clear();
        SimpleSwal('<strong>Atenção</strong>', response.data.message, 'warning')
        this.props.history.push('/')
      } else {
        console.log(response.data.data)
        SimpleNoty('Sucesso!', 'success')        
        document.getElementById('comments').html(formatHtmlQuestion(response.data.data))
      }
    });
  }

  function formatHtmlQuestion(data){
    let html = '<ul>'
    for(var [key, value] of Object.entries(data)){
      html += '<li>'+value['comment']+'</li>'
    }
    html += '</ul>'
    return html
  }

  function handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setComment(value)
  }

  return (
    <React.Fragment>
      <Header />
      <Container className="theme-dark" maxWidth="lg">
        <Grid container>
          <Grid item sm={12}>
            <h1>Live</h1>
          </Grid>
          <Grid item md={8} xs={12}>
            <iframe width="100%" height="100%" src="https://player.vimeo.com/video/553326280" title="Live" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen ></iframe>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card>
              <CardContent className="bg-dark">
                <h3 className="mr-text-light mr-font-weight-200">Minhas Perguntas</h3>
                <div id="comments" className="comments">

                </div>
                <div className="form-inline">
                  <form autoComplete="off" className="send-comment" onSubmit={handleSubmit}>
                    <input type="hidden" name="user_id" value={userid} />
                    <FormGroup display="inline">
                      <Grid container>
                        <Grid item sm={10}>
                          <TextField
                            name="comment"
                            id="comment"
                            type="text"
                            label="Adicionar pergunta"
                            className="ext-input"
                            fullWidth
                            value={comment}
                            onChange={e => handleChange(e)}
                            required
                          />
                        </Grid>
                        <Grid item sm={2}>
                          <IconButton
                            aria-label="Enviar"
                            type="submit"
                          >
                            <SendSharp />
                          </IconButton>
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