import { Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import api from '../../services/api';
import GetAppIcon from '@material-ui/icons/GetApp';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { SimpleSwal } from '../../helpers/SwalFeedBack';
import { SimpleNoty } from '../../helpers/NotyFeedBack';

function ListVideos(param) {
    const [items, setItems] = useState([]);
    const [token] = useState(localStorage.getItem('token'));

    useEffect(() => {
        api.get('api/v1/videovdi/getByType/' + param.type, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.data.status && response.data.status === (401 || 498)) {
                localStorage.clear();
                SimpleSwal('<strong>Atenção</strong>',response.data.message, 'warning')                                 
                this.props.history.push('/')
            } else {
                setItems(response.data.data);
            }            
        }).catch((error) => {
            SimpleNoty('Opps! Falha ao tentar recuperar os dados.', 'warning')
        });
    }, [token, param])

    async function download(id) {
        api.get('api/v1/videovdi/downloadVideo/' + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            response.blob()
        }).catch((error) => {
            console.log("Ocorreu um erro ao buscar os items" + error);
        });
    }

    return (
        <Grid container>
            {items.length > 0 ? (
                <Grid item xs={12}>
                    <Typography variant="h5" component="h5" align="center" gutterBottom className="white">Anúncios para {items[0]['type']}</Typography>
                </Grid>
            ) : null}
            {items.length > 0 ? items.map((list) =>
            (
                <Grid key={list.id} item xs={4}>
                    <Button 
                        className="button" 
                        align="center" 
                        onClick={() => download(list.id)}
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
        
    )
}

export default ListVideos
