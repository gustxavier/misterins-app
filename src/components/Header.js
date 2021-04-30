import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { AppBar, Toolbar, Tooltip, Typography  } from '@material-ui/core';

export default function Header() {
  const [token] = useState(localStorage.getItem('token'));
  const [username] = useState(localStorage.getItem('username'));
  const history = useHistory();

  if(token === '' || token === null){
    history.push('/');
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="header">
      <AppBar className="menu" position="static">
        <Toolbar>
          <Link to="/lives" className="menuTitle">
            <img src="https://misterins.com.br/wp-content/themes/misterins/assets/images/logo.png" alt="mister-ins" />
          </Link>

          <Tooltip title="Desconectar">
            <button className="menuButton" onClick={handleLogout} type="button">
              <Typography title="sair">{username}</Typography><FiPower size={16} color="#fff"/> 
            </button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}