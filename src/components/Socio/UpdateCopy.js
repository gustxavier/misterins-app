import React, { useState } from 'react';
import api from '../../services/api';

import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';
import { SimpleNoty } from '../../helpers/NotyFeedBack';
import { SimpleSwal } from '../../helpers/SwalFeedBack';

class UpdateCopy extends React.Component {

    constructor(props) {
        super(props);        

        this.state = {
            loading: false,
            id: '',
            title:   '',
            important_text: '',
            description: '',
            token: localStorage.getItem('token')
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.getCopy(1)
    }

    getCopy($id) {
        api.get('api/v1/copy/' + $id,
            {
            headers: {
                Authorization: `Bearer ${this.state.token}`,
            }
        }
        ).then(response => {
            if (response.data.status && (response.data.status === 401 || response.data.status === 498)) {
                return response.data.status;
            }
            this.setState({
                id: response.data.data.id,
                title: response.data.data.title,
                important_text: response.data.data.important_text,
                description: response.data.data.description !== null ? response.data.data.description : '',
            });
            return response.data;
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true })

        api.put('api/v1/copy/1',
            this.state, {
            headers: {
                Authorization: `Bearer ${this.state.token}`,
            }
        }
        ).then(response => {
            if (response.data.status && response.data.status === (401 || 498)) {
                localStorage.clear();
                SimpleSwal('<strong>Atenção</strong>', response.data.message, 'warning')
                this.props.history.push('/')
            } else {
                SimpleNoty('Sucesso!', 'success')
                this.props.history.push('/admin/socio')
            }
        });
    }

    handleChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        this.setState({
            [event.target.name]: value
        });
    }

    render() {
        return (
            <div className="form card">
                <Typography><strong>Atualizar Copy</strong></Typography>
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                >
                    <Grid container>
                        <Grid item sm={12}>
                            <TextValidator
                                name="title"
                                id="title"
                                label="Título"
                                variant="outlined"
                                className="TextFieldBlock"
                                value={this.state.title}
                                onChange={this.handleChange}
                                validators={['required']}
                                errorMessages={['Por favor, insira o título da copy']}
                            />
                            <TextValidator
                                name="important_text"
                                id="important_text"
                                label="Texto Importante"
                                variant="outlined"
                                multiline
                                rows={2}
                                value={this.state.important_text}
                                onChange={this.handleChange}
                                validators={['required']}
                                errorMessages={['Por favor, insira o texto mais importante da copy']}
                            />
                            <TextField
                                name="description"
                                id="description"
                                label="Descrição"
                                variant="outlined"
                                multiline
                                rows={2}
                                value={this.state.description}
                                onChange={this.handleChange}
                            />
                            <Button className="button" type="submit" disabled={this.state.loading}>
                                {this.state.loading && <span className="inline"><FontAwesomeIcon icon={faSync} spin /> <Typography> Atualizando...</Typography></span>}
                                {!this.state.loading && <span className="inline"><Typography>Atualizar</Typography></span>}
                            </Button>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
        );
    }
}

export default withRouter(UpdateCopy);