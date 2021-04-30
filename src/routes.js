import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Lists from './pages/Lists';
import Lives from './pages/Lives';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/lives">
          <Lives />
        </Route>
        <Route path="/lists">
          <Lists />
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
      </Switch>     
    </BrowserRouter>
  );
}