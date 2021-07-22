import React from "react";
import Header from "../../../components/Header";
import List from "../../../components/Usuario/List";

import "./style.css";
import Insert from "../../../components/Usuario/Insert";
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
          <List />
          <Insert onSpinner={handleSpinner} />
        </main>
      </div>
    </React.Fragment>
  );
}
