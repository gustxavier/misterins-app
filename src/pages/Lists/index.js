import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Task from '../../components/Task';
import InsertList from '../../components/InsertList';
import InsertTask from '../../components/InsertTask';
import { Container, Grid } from '@material-ui/core';
import api from '../../services/api';
import InsertLive from '../../components/InsertLive';
import InsertCopy from '../../components/Forms/Copy/InsertCopy';
import UpdateCopy from '../../components/Forms/Copy/UpdateCopy';
import UploadVideoSocio from '../../components/Forms/SocioVideo/UploadVideoSocio';

import './styles.css';

export default function Lists() {
  const [token] = useState(localStorage.getItem('token'));
  const [taskList, setTaskList] = useState([]);
  const [lives, setLives] = useState([]);
  const [listId, setListId] = useState('');

  const history = useHistory();

  useEffect(() => {
    api.get('api/v1/tasklist', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      if (response.data.status && response.data.status === (401 || 498)) {
        localStorage.clear();
        history.push('/');
      } else {
        setTaskList(response.data.data);
      }
    }).catch(err => {
      alert(err)
    })
  }, [token, history]);

  async function onInsertList(data) {
    api.post("/api/v1/tasklist", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      if (response.data.status && response.data.status === (401 || 498)) {
        localStorage.clear();
        history.push('/');
      }
      setTaskList([...taskList, response.data.data]);
    }).catch(err => {
      alert(err)
    })
  }

  async function onInsertLive(data) {
    console.log(data);
    api.post("/api/v1/lives", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      if (response.data.status && response.data.status === (401 || 498)) {
        localStorage.clear();
        history.push('/');
      }
      setLives([...lives, response.data.data]);
    }).catch(err => {
      alert(err)
    })
  }

  async function onInsertTask(data) {
    await setListId('')
    await api.post("/api/v1/tasks", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      console.log(response)
      if (response.data.status && response.data.status === (401 || 498)) {
        localStorage.clear();
        history.push('/');
      }
      setListId(response.data.data.list_id)
    }).catch(err => {
      alert(err)
    })

  }

  return (
    <React.Fragment>
      <Header />
      <Container className="theme-dark" maxWidth="xl">
        <Grid container>
          {localStorage.getItem('permission') === 'admin' &&
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={3}>
                  <InsertList onInsertList={onInsertList} />
                </Grid>
                <Grid item xs={3}>
                <UpdateCopy />
                  {/* <InsertTask onInsertTask={onInsertTask} taskList={taskList} /> */}
                </Grid>
                <Grid item xs={3}>
                  <InsertLive onInsertLive={onInsertLive} />
                </Grid>
                <Grid item xs={3}>
                  <InsertCopy />
                </Grid>
                <Grid item xs={3}>
                  <UploadVideoSocio />
                </Grid>
              </Grid>
            </Grid>
          }
          <Grid item xs={8}>
            <Container maxWidth="xl">
              <Grid container>
                {/* {taskList.length > 0 ? taskList.map((list) =>
                (
                  <Grid item xs={4} key={list.id}>
                    <div className="ListContainer">
                      <div className="ListHeader">
                        {list.status === "À Fazer" ? (
                          <h3 className="ListTitle">{list.title}</h3>
                        ) : (
                          <h3 className="ListTitle">{list.title} - Finalizado</h3>
                        )}

                      </div>
                      <div className="Taks">
                        <div className="TaskItem">
                          <Container maxWidth="xl">
                            <Task list={list.id} listId={listId} />
                          </Container>
                        </div>
                      </div>
                    </div>
                  </Grid>
                )) : null
                } */}
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}