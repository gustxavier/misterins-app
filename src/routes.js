import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Register from "./pages/Register";
import Lives from "./pages/Lives";
import Socio from "./pages/Socio";
import Dashboard from "./pages/Dashboard";
import SocioAdmin from "./pages/Admin/Socio";
import LiveAdmin from "./pages/Admin/Live";
import Usuario from "./pages/Admin/Usuario";
import Profile from "./components/Usuario/Profile";
import Reset from "./pages/Password/Reset";
import Recouver from "./pages/Password/Recouver";
import ProtectedRoute from "./components/ProtectedRoutes";
import Error404 from "./components/Errors";

export default function Routes() {


  useEffect(() => {
    console.log()
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path="/socio" component={Socio} /> 
        <ProtectedRoute path="/lives" component={Lives} /> 
        <ProtectedRoute path="/dashboard" component={Dashboard} /> 
        <ProtectedRoute path="/admin/usuario/profile/:id" component={Profile} /> 
        <ProtectedRoute path="/admin/usuario" component={Usuario} /> 
        <ProtectedRoute path="/admin/live" component={LiveAdmin} /> 
        <ProtectedRoute path="/admin/socio" component={SocioAdmin} /> 
        <Route path="/logon" component={Logon} /> 
        <Route path="/recouver/:hash" render={(props) => <Recouver {...props} />}/> 
        <Route path="/reset" component={Reset} /> 
        <Route path="/register" component={Register} /> 
        <Route exact path="/" component={Logon} /> 
        <Route path="*" component={Error404} />          
      </Switch>
    </BrowserRouter>
  );
}
