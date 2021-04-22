import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import Noty from 'noty';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

import "../../../node_modules/noty/lib/noty.css";  
import "../../../node_modules/noty/lib/themes/metroui.css";  

import api from '../../services/api';

import './styles.css';

export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('api/login', { email, password });
      localStorage.setItem('token', response.data.token);

      history.push('/lists');
    } catch (err) {
      // setTimeout(function() {
        new Noty({
          text: "Oops! Falha ao realizar o login!",
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

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#3498db" />
            Não tenho cadastro
          </Link>
        </Form>
      </section>
    </div>
  );
}
