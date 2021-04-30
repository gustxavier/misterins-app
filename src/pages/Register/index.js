import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Noty from 'noty';
import WarningIcon from '@material-ui/icons/Warning';

import api from '../../services/api';
import './styles.css';
import "../../../node_modules/noty/lib/noty.css";  
import "../../../node_modules/noty/lib/themes/metroui.css";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      "name":name,
      "email":email,
      "password":password,
      "password_confirmation":confirmPassword,
    };
    
    try {
      await api.post('api/register', data)
      .then(async (res) =>{        
        if(res.data.status && !res.data.alertType){
          const responseLogin = await api.post('api/login', { email, password });
          localStorage.setItem('token', responseLogin.data.token);
          history.push('/lives');
        }else{
          new Noty({
            text: '<p><svg class="MuiSvgIcon-root icon-alert" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></svg>'+res.data.msg+'</p>',
            theme: "metroui",
            timeout: 2000,
            progressBar: true,
            type: res.data.alertType
          }).show();
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
    <div className="register-container">
      <div className="content">
        <section>
        <img src="https://misterins.com.br/wp-content/themes/misterins/assets/images/logo.png" />

          <h1>Cadastro<WarningIcon /></h1>
          <p>Faça seu cadastro, entre na plataforma e aproveite os conteúdos que temos à oferecer.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#3498db" />
            Já possuo cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Seu Nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input 
            type="email" 
            placeholder="Seu E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input 
            placeholder="Digite sua Senha"
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
          />

          <input 
            placeholder="Confirme sua Senha"
            value={confirmPassword}
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}