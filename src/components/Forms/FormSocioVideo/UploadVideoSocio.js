import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { withRouter } from 'react-router';

class UploadVideoSocio extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            path: '',
            type: ''
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onChange(e) {
        let files = e.target.files || e.dataTransfer.files;
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

    }

    render() {
        return (
            <div className="form card">
                <Typography><strong>Cadastrar Copy</strong></Typography>
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
                                errorMessages={['Por favor, insira o título do vídeo']}
                            />
                                <Input 
                                type="file" 
                                name="archive"
                                id="archive"
                                label="archive"
                                variant="outlined"
                                validators={['required']}
                                onChange={this.onChangeFile}
                                />
                            <FormControl variant="outlined">
                                <InputLabel id="demo-simple-select-outlined-label">Tipo de Postagem</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={this.state.type}
                                    // onChange={this.handleChange}
                                    label="Tipo de postagem"
                                    validators={['required']}
                                    errorMessages={['Por favor, selecione um tipo']}
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

export default withRouter(UploadVideoSocio);