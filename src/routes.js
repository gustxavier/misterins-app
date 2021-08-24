import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Register from "./pages/Register";
import LiveView from "./components/Live/View";
import LiveList from "./pages/Lives";
import Socio from "./pages/Socio";
import Dashboard from "./pages/Dashboard";
import AdminSocio from "./pages/Admin/Socio";
import AdminLiveView from "./components/Live/Admin/View";
import AdminLiveList from "./pages/Admin/Live";
import Usuario from "./pages/Admin/Usuario";
import Profile from "./components/Usuario/Profile";
import Reset from "./pages/Password/Reset";
import Recouver from "./pages/Password/Recouver";
import ProtectedRoute from "./components/ProtectedRoutes";
import Error404 from "./components/Errors";
import AdminSocioCopy from "./components/Socio/Copy/Admin/View/index.js";
import AdminSocioVideo from "./components/Socio/Video/Admin/View/index.js";
import MrZap from "./pages/Admin/MrZap";
import CampaignView from "./components/MrZap/Campanha/View";
import CampaignGroupView from "./components/MrZap/Grupos/View";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute
          path="/admin/mrzap/campaigngroup/:id"
          component={CampaignGroupView}
        />
        <ProtectedRoute
          path="/admin/mrzap/campaign/:id"
          component={CampaignView}
        />
        <ProtectedRoute path="/admin/mrzap/campanha" component={MrZap} />
        <ProtectedRoute path="/socio/:id" component={Socio} />
        <ProtectedRoute path="/lives" component={LiveList} />
        <ProtectedRoute path="/live/:id" component={LiveView} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/admin/usuario/profile/:id" component={Profile} />
        <ProtectedRoute path="/admin/usuario" component={Usuario} />
        <ProtectedRoute path="/admin/live/:id" component={AdminLiveView} />
        <ProtectedRoute path="/admin/lives" component={AdminLiveList} />
        <ProtectedRoute
          path="/admin/socio/video/:id"
          component={AdminSocioVideo}
        />
        <ProtectedRoute
          path="/admin/socio/copy/:id"
          component={AdminSocioCopy}
        />
        <ProtectedRoute path="/admin/socio/:id" component={AdminSocio} />
        <Route path="/logon" component={Logon} />
        <Route
          path="/recouver/:hash"
          render={(props) => <Recouver {...props} />}
        />
        <Route path="/reset" component={Reset} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Logon} />
        <Route path="*" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
}
