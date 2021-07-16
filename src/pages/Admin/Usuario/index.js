import React from "react";
import Header from "../../../components/Header";
import Lista from "../../../components/Usuario/Lista";

import "./style.css";
import Inserir from "../../../components/Usuario/Inserir";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";

export default function Usuario() {
  const [spinner, setEventSpinner] = useState(false);

  function handleSpinner(event) {
    setEventSpinner(event);
  }

  return (
    <React.Fragment>
      <div className={"d-flex"}>
        <Header title={"Admin - Usuários"} />
        <main className={"content-dark"}>
          <div className={"app-bar-spacer"} />
          {spinner && (
            <div id="spinner-live" className="spinner">
              <CircularProgress />
            </div>
          )}
          <Lista />
          <Inserir onSpinner={handleSpinner} />
        </main>
      </div>
    </React.Fragment>
  );
}
