import React from "react";
import Header from "../../../components/Header";

import "./style.css";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import ListaCampanha from "../../../components/MrZap/Campanha/List";

export default function MrZap() {
  const [spinner, setEventSpinner] = useState(false);

  function handleSpinner(event) {
    setEventSpinner(event);
  }

  return (
    <React.Fragment>
      <div className={"d-flex"}>
        <Header title={"Admin - Campanhas"} />
        <main className={"content-dark"}>
          <div className={"app-bar-spacer"} />
          {spinner && (
            <div id="spinner-live" className="spinner">
              <CircularProgress />
            </div>
          )}
          <ListaCampanha onSpinner={handleSpinner}/>
        </main>
      </div>
    </React.Fragment>
  );
}
