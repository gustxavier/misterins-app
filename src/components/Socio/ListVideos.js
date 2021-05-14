import { Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import api from '../../services/api';
import GetAppIcon from '@material-ui/icons/GetApp';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { SimpleSwal } from '../../helpers/SwalFeedBack';
import { SimpleNoty } from '../../helpers/NotyFeedBack';
import { useHistory } from 'react-router';

function ListVideos(param) {
    const [items, setItems] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const history = useHistory();

    useEffect(() => {
        api.get('api/v1/videovdi/getByType/' + param.type, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.data.status && response.data.status === (401 || 498)) {
                localStorage.clear();
                SimpleSwal('<strong>Atenção</strong>', response.data.message, 'warning')
                history.push('/')
            } else {
                setItems(response.data.data);
            }
        }).catch((error) => {
            console.log('On getByType')
            localStorage.clear();
        });
    }, [token, history, param])

    async function download(id, file_name) {
        api.get('api/v1/videovdi/downloadVideo/' + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'blob'
        }).then((response) => {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(new Blob([response.data]));
            link.download = file_name;
            link.click();
        }).catch((error) => {
            console.log('On getByType')
            localStorage.clear();
        });
    }

    return (
        <div>
            {items.length > 0 ? (
                <div className="videos">
                    <Grid container>

                        <Grid item xs={12}>
                            <Typography variant="h5" component="h5" align="center" gutterBottom className="white">Anúncios para {items[0]['type']}</Typography>
                        </Grid>

                        {items.length > 0 ? items.map((list) =>
                        (
                            <Grid key={list.id} item xs={4}>
                                <Button
                                    className="button"
                                    align="center"
                                    onClick={() => download(list.id, list.file_name)}
                                    startIcon={<PlayCircleOutlineIcon />}
                                    endIcon={<GetAppIcon />}
                                    title="Download"
                                    type="submit"
                                >
                                    {list.title}
                                </Button>
                            </Grid>
                        )) : null
                        }
                    </Grid>
                </div>
            ) : null}
        </div>
    )
}

export default ListVideos
