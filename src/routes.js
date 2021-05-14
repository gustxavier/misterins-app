import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Lives from './pages/Lives';
import Socio from './pages/Socio';
import ProtectedRoute from './components/ProtectedRoutes';

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
        <Route path="/admin">
          <Admin />
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