import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Register from "./pages/Register";
import Lives from "./pages/Lives";
import Socio from "./pages/Socio";
import Dashboard from "./pages/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoutes";
import SocioAdmin from "./pages/Admin/Socio";
import LiveAdmin from "./pages/Admin/Live";
import Usuario from "./pages/Admin/Usuario";
import Profile from "./components/Usuario/Profile";


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/socio" component={Socio} /> 
        <Route path="/lives" component={Lives} /> 
        <Route path="/dashboard" component={Dashboard} /> 
        <Route path="/admin/usuario/profile/:id" component={Profile} /> 
        <Route path="/admin/usuario" component={Usuario} /> 
        <Route path="/admin/live" component={LiveAdmin} /> 
        <Route path="/admin/socio" component={SocioAdmin} /> 
        <Route path="/logon" component={Logon} /> 
        <Route path="/register" component={Register} /> 
        <Route exact path="/" component={Logon} /> 
        {/* <ProtectedRoute path="/hidden" component={"Socio"} /> */}
      </Switch>
    </BrowserRouter>
  );
}
