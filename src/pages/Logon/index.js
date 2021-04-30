import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import Noty from 'noty';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

import "../../../node_modules/noty/lib/noty.css";
import "../../../node_modules/noty/lib/themes/metroui.css";

import api from '../../services/api';

import './styles.css';
import { Typography } from '@material-ui/core';

export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post('api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('permission', response.data.permission);
      history.push('/lives');
    } catch (err) {
      setLoading(false);
      new Noty({
        text: "Oops! Usuário ou senha inválido!",
        theme: "metroui",
        timeout: 2000,
        progressBar: true,
        type: "warning"
      }).show();
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src="https://misterins.com.br/wp-content/themes/misterins/assets/images/logo.png" alt="Mister Ins" />
        <Form onSubmit={handleLogin}>
          <Input

            placeholder="Seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            placeholder="Sua Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="button" type="submit" disabled={loading}>
            {loading && <span className="inline"><AutorenewIcon /><Typography>Entrando...</Typography></span>}
            {!loading && <span className="inline"><Typography>Entrar</Typography></span>}
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#3498db" />
            Não tenho cadastro
          </Link>
        </Form>
      </section>
    </div>
  );
}
