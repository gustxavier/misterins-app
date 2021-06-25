import React from "react";
import Header from "../../../components/Header";
import Lista from "../../../components/Usuario/Lista";

import "./style.css";
import Inserir from "../Inserir";

export default function Usuario() {
  return (
    <React.Fragment>
      <div className={"d-flex"}>
        <Header title={"Admin - Usuários"} />
        <main className={"content-dark"}>
          <div className={"app-bar-spacer"} />
          <Lista />
          <Inserir />
        </main>
      </div>
    </React.Fragment>
  );
}
