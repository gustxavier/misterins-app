import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../../components/Header";
import ListUsuarios from "../../../components/Usuario/List";

export default function Usuario() {
  const [token] = useState(localStorage.getItem("token"));
  const history = useHistory();

  useEffect(() => {}, [token, history]);

  return (
    <React.Fragment>
      <div className={"d-flex"}>
        <Header title={"Admin - Usuários"} />
        <main className={"content-dark"}>
          <div className={"app-bar-spacer"} />          
          <ListUsuarios />
        </main>
      </div>
    </React.Fragment>
  );
}
