import React from 'react'
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FormControl, Grid, Input, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { withRouter } from 'react-router';
import './style.css'
import { SimpleSwal } from '../../helpers/SwalFeedBack';
import { SimpleNoty } from '../../helpers/NotyFeedBack';
import api from '../../services/api';

class UploadVideo extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            title: '',
            path: '',
            type: '',
            archive: '',
            token: localStorage.getItem('token')
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeInputFile = this.onChangeInputFile.bind(this)
    }

    handleChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        this.setState({
            [event.target.name]: value
        });
    }

    onChangeInputFile(e) {
        let files = e.target.files || e.dataTransfer.files;
        console.log(e.target)
        if (!files.length)
            return;

        let reader = new FileReader();

        reader.onload = (e) => {
            this.setState({
                archive: e.target.result
            })
        };
        reader.readAsDataURL(files[0]);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true })

        api.post('api/v1/partnervideovdi',
            this.state, {
            headers: {
                Authorization: `Bearer ${this.state.token}`,
            }
        }).then(response => {
            if (response.data.status && response.data.status === (401 || 498)) {
                localStorage.clear();
                SimpleSwal('<strong>Atenção</strong>', response.data.message, 'warning')
                this.props.history.push('/')
            } else {
                SimpleNoty('Sucesso!', 'success')
                this.props.history.push('/socio')
            }
        });
    }

    render() {
        const useStyles = makeStyles((theme) => ({
            formControl: {
              margin: theme.spacing(1),
              minWidth: 120,
            },
            selectEmpty: {
              marginTop: theme.spacing(2),
            },
          }));
        return (            
            <div className="form card">
                <Typography><strong>Cadastrar Vídeo Sócio</strong></Typography>
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                >
                    <Grid container>
                        <Grid item sm={12}>
                            <Input
                                name="path"
                                type="hidden"
                                value=""
                            />
                            <TextValidator
                                name="title"
                                id="title"
                                label="Título"
                                variant="outlined"
                                className="TextFieldBlock"
                                value={this.state.title}
                                onChange={this.handleChange}
                                validators={['required']}
                                errorMessages={['Por favor, insira o título do vídeo']}
                            />
                            <Input
                                className="input-file"
                                type="file"
                                name="archive"
                                id="archive"
                                label="archive"
                                variant="outlined"
                                validators={['required']}
                                inputProps={{ accept: 'video/*' }}
                                onChange={this.onChangeInputFile}
                            />
                            <FormControl variant="outlined">
                                <InputLabel id="demo-simple-select-outlined-label">Tipo de Postagem</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={this.state.type}
                                    name='type'
                                    onChange={this.handleChange}
                                    label="Tipo de postagem"
                                >
                                    <MenuItem value={'feed'}>Feed</MenuItem>
                                    <MenuItem value={'story'}>Storys</MenuItem>
                                </Select>
                            </FormControl>
                            <Button className="button" type="submit" disabled={this.state.loading}>
                                {this.state.loading && <span className="inline"><FontAwesomeIcon icon={faSync} spin /> <Typography> Adicionando...</Typography></span>}
                                {!this.state.loading && <span className="inline"><Typography>Adicionar</Typography></span>}
                            </Button>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
        )
    }
}

export default withRouter(UploadVideo);