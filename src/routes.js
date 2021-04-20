import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import YouTubeLivesPage from './pages/YouTubeLivesPage';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/youtubelives">
          <YouTubeLivesPage />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}
