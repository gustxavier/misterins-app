import React, { useState, Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Noty from 'noty';

import api from '../../services/api';
import './styles.css';
import "../../../node_modules/noty/lib/noty.css";
import "../../../node_modules/noty/lib/themes/metroui.css";
import {Container, Grid, TextField} from '@material-ui/core';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      "name": name,
      "email": email,
      "facebook": facebook,
      "instagram": instagram,
      "cpf": cpf,
      "password": password,
      "password_confirmation": confirmPassword,
    };

    const MySwal = withReactContent(Swal)

    try {
      await api.post('api/register', data)
        .then(async (res) => {
          if (res.data.status && !res.data.alertType) {
            const responseLogin = await api.post('api/login', { email, password });
            localStorage.setItem('token', responseLogin.data.token);
            history.push('/lives');
          } else {     
            MySwal.fire({
              title: '<strong>HTML <u>example</u></strong>',
              icon: 'erro',
              html:
                'You can use <b>bold text</b>, ' +
                '<a href="//sweetalert2.github.io">links</a> ' +
                'and other HTML tags',
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: false,
              confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Great!',
              confirmButtonAriaLabel: 'Thumbs up, great!',
              cancelButtonText:
                '<i class="fa fa-thumbs-down"></i>',
              cancelButtonAriaLabel: 'Thumbs down'
            })       
            // new Noty({
            //   // text: '<p><svg class="MuiSvgIcon-root icon-alert" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></svg>' + res.data.msg + '</p>',
            //   text: '<Alert variant="filled" severity="warning">This is a warning alert — check it out!</Alert>',
            //   theme: "metroui",
            //   timeout: 4000,
            //   progressBar: true,
            //   type: res.data.alertType
            // }).show();
          }
        });
    } catch (err) {
      new Noty({
        text: "Oops! Falha ao realizar o cadastro!",
        theme: "metroui",
        timeout: 2000,
        progressBar: true,
        type: "warning"
      }).show();
    }
  }

  return (
      <Container maxWidth="lg">
        <div className="register-container">
          <div className="content">
            <Grid container>
              <Grid item sm={4}>
                <section>
                  <img src="https://misterins.com.br/wp-content/themes/misterins/assets/images/logo.png" alt="Mister Ins" />
                  <h1>Cadastro</h1>
                  <p>Faça seu cadastro, entre na plataforma e aproveite os conteúdos que temos à oferecer.</p>

                  <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#3498db" />
                    Já possuo cadastro
                  </Link>
                </section>
              </Grid>
              <Grid item sm={8}>
                <form onSubmit={handleRegister}>
                  <Grid container>
                    <Grid item sm={6}>
                      <TextField
                        label="Seu Nome"
                        variant="outlined"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        label="Seu Facebook"
                        variant="outlined"
                        value={facebook}
                        onChange={e => setFacebook(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        type="email"
                        label="Seu E-mail"
                        variant="outlined"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        label="Seu Instagram"
                        variant="outlined"
                        value={instagram}
                        onChange={e => setInstagram(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <InputMask
                        value={cpf}
                        onChange={e => setCpf(e.target.value)}
                        required
                        mask="999.999.999-99"
                        maskChar={null}
                      >
                        {inputProps =>
                          <TextField
                            {...inputProps}
                            fullWidth
                            label="CPF"
                            variant="outlined"
                            maxLength={14}
                          />
                        }
                      </InputMask>
                    </Grid>
                    <Grid item sm={12}>
                      <TextField
                        label="Digite uma senha"
                        variant="outlined"
                        value={password}
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                      />
                      <TextField
                        label="Confirme sua senha"
                        variant="outlined"
                        value={confirmPassword}
                        type="password"
                        onChange={e => setConfirmPassword(e.target.value)}
                      />
                      <button className="button" type="submit">Cadastrar</button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
  );
}