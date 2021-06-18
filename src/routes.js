import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Lives from './pages/Lives';
import Socio from './pages/Socio';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoutes';
import SocioAdmin from './pages/Admin/Socio';
import LiveAdmin from './pages/Admin/Live';
import Usuario from './pages/Admin/Usuario';
import Profile from './pages/Admin/Usuario/Profile';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/socio">
          <Socio />
        </Route>
        <Route path="/lives">
          <Lives />
        </Route>        
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/admin/usuario/profile">
          <Profile />
        </Route>
        <Route path="/admin/usuario">
          <Usuario />
        </Route>
        <Route path="/admin/live">
          <LiveAdmin />
        </Route>
        <Route path="/admin/socio">
          <SocioAdmin />
        </Route>
        <Route path="/logon">
          <Logon />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Logon />
        </Route>
        <ProtectedRoute path="/hidden" component={'Socio'} />
      </Switch>
    </BrowserRouter>
  );
}