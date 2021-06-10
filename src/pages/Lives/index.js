import React, { useEffect, useState } from 'react'
import { Container, Grid, Card, CardContent, TextField, FormGroup, IconButton, CircularProgress, Paper } from '@material-ui/core';
import ChatMessage from '../../components/ChatMessage';
import { SendSharp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/Header';
import api from '../../services/api';
import { SimpleSwal } from '../../helpers/SwalFeedBack';
import { SimpleNoty } from '../../helpers/NotyFeedBack';
import { forEach, isSet, map } from 'lodash';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';
import { DataGrid } from '@material-ui/data-grid';
import './styles.css';


export default function Lives() {
  const [comment, setComment] = useState("")
  const [commentList, setCommentList] = useState([])
  const [livelink, setLiveLink] = useState("")
  const [hotmartLiveId, setHotmartLiveId] = useState("");
  const userid = localStorage.getItem('userid')
  const token = localStorage.getItem('token')
  const courses = localStorage.getItem('courses')
  const history = useHistory()
  const [spinner, setSpinner] = useState(true)


  useEffect(() => {
    setSpinner(false)
    getLiveLink()
    // getAllComments()
    // api.get('api/v1/live-comment', {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   params: {
    //     'user_id': localStorage.getItem('userid')
    //   }
    // }
    // ).then(response => {
    //   if (response.data.status && response.data.status === (401 || 498)) {
    //     localStorage.clear();
    //     SimpleSwal('<strong>Atenção</strong>', response.data.message, 'warning')
    //     history.push('/')
    //   } else {
    //     const div = document.createElement('div')
    //     div.innerHTML = formatHtmlQuestion(response.data.data)
    //     // document.getElementById('comments').append(div)
    //     setSpinner(false)
    //   }
    // });
  }, [token]);


  function handleSubmit(event) {
    event.preventDefault()

    const data = {
      'user_id': event.target.user_id.value,
      'live_id': 1,
      'comment': event.target.comment.value
    }

    api.post('api/v1/live-comment', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    ).then(response => {
      if (response.status && response.status === (401 || 498)) {
        localStorage.clear();
        SimpleSwal('<strong>Atenção</strong>', "Oops", 'warning')
        this.props.history.push('/')
      } if ('msg' in response.data) {
        SimpleSwal('<strong>Atenção</strong>', response.data.msg, 'warning')
      } else {
        const div = document.createElement('div')
        div.innerHTML = formatHtmlQuestion(response.data)
        document.getElementById('comments').append(div)
        setComment('')
      }
    });
  }

  function formatHtmlQuestion(data) {
    let html = ''
    for (var [key, value] of Object.entries(data)) {
      if (key !== 'status')
        html += '<p><strong>' + localStorage.getItem('username') + '</strong> - ' + value['comment'] + '</p>'
    }
    return html
  }

  function handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setComment(value)
  }

  async function getLiveLink() {
    api.get('api/v1/lives', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    ).then(response => {
      if (response.data.status && (response.data.status === 401 || response.data.status === 498)) {
        localStorage.clear();
        SimpleSwal('<strong>Atenção</strong>', response.data.message, 'warning')
        history.push('/')
      } else {
        if (response.data.data.length > 0) {
          setLiveLink(response.data.data[0].url)
          setHotmartLiveId(response.data.data[0].hotmart_id)
        }
      }
    });
  }

  async function getAllComments() {
    api.get('api/v1/live-comment/live/1', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    ).then(response => {
      if (response.data.status && (response.data.status === 401 || response.data.status === 498)) {
        localStorage.clear();
        SimpleSwal('<strong>Atenção</strong>', response.data.message, 'warning')
        history.push('/')
      } else {
        setCommentList([...commentList, response.data.data])
      }
    });
  }

  return (
    <React.Fragment>
      <div className={'d-flex'}>
        {spinner &&
          <div id="spinner-live" className="spinner">
            <CircularProgress />
          </div>
        }
        <Header title={'Live'} />
        <main className={'content-dark'}>
        <div className={'app-bar-spacer'} />
        <Container maxWidth="lg" className={'container'}>
          <Grid container spacing={3}>
              {(
                courses.search('1442311') !== -1 ||
                courses.search('448026') !== -1
              ) &&
                <Grid item sm={12} xs={12}>
                  <Paper className="paper">
                    <Alert variant="outlined" severity="info">Para fazer uma pergunta acesse o instagram do Maico (maicoandrade) e faça uma pergunta nas caixinhas do storys.</Alert>
                    <iframe width="100%" height="600px" src={livelink} title="Live" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen ></iframe>
                  </Paper>
                </Grid>
              }
              {(
                courses.search('1442311') === -1 ||
                courses.search('448026') === -1
              ) &&
                <Grid item sm={12} xs={12}>
                  <Alert variant="outlined" severity="warning">Nenhuma live disponível. Se você ouviu rumores sobre live e não está vendo, provavelmente a live é fechada para alunos de um determinado curso.</Alert>
                </Grid>
              }
              {/* <Grid item md={4} xs={12}>
            <Card>
              <CardContent className="bg-dark">
                <h3 className="mr-text-light mr-font-weight-200">Minhas Perguntas</h3>
                <div id="comments" className="comments">
                  <Alert variant="outlined" severity="info">Limitamos apenas 10 perguntas por usuário para que consigamos responder a maioria.</Alert>
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
          </Grid> */}
              {/* <Grid item sm={12}>
            <ul>
              {commentList.length > 0 ? commentList.map((list) =>
              (                
                <li key={list.id}>{list.comment}{console.log(list)} - teste</li>
              )) : null
              }
            </ul>
          </Grid> */}
            </Grid>
          </Container>
        </main>
      </div>
    </React.Fragment >
  )
}