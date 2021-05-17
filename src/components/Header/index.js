import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { AppBar, Button, Toolbar, Tooltip, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import './style.css'

export default function Header() {
  const [token] = useState(localStorage.getItem('token'));
  const [username] = useState(localStorage.getItem('username'));
  const history = useHistory();

  if (token === '' || token === null) {
    history.push('/');
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  function handleAffiliate(){
    window.open('https://app-vlc.hotmart.com/affiliate-recruiting/view/2201V44551760')
  }

  return (
    <div className="header">
      <AppBar className="menu" position="static">
        <Toolbar>
          <Link to="/socio" className="menuTitle">
            <img src="https://misterins.com.br/wp-content/themes/misterins/assets/images/logo.png" alt="mister-ins" />
          </Link>
          {localStorage.getItem('permission') === 'admin' &&
            <Link className="link" color="secondary" to="/admin">
              Administração
          </Link>
          }
          {localStorage.getItem('permission') !== 'admin' &&
            <Button
              title="Seja um afiliado Mister Ins"
              className="affiliate-button"
              onClick={handleAffiliate}
            ><ThumbUpAltIcon></ThumbUpAltIcon> Seja um Afiliado</Button>
          }
          <Tooltip title="Desconectar">
            <button className="menuButton" onClick={handleLogout} type="button">
              <Typography title="sair">{username}</Typography><FiPower size={16} color="#fff" />
            </button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}