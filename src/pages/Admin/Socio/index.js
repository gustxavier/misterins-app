import React, { useState } from "react";
import Header from "../../../components/Header";
import "./styles.css";
import Footer from "../../../components/Footer";
import { CircularProgress } from "@material-ui/core";
import Insert from "../../../components/Socio/Copy/Admin/Insert";
import List from "../../../components/Socio/Copy/Admin/List";

export default function Socio() {
  const [spinner, setEventSpinner] = useState(false);

  function handleSpinner(event) {
    setEventSpinner(event);
  }

  return (
    <React.Fragment>
      <div className={"d-flex"}>
        <Header title={"Admin - Sócio"} />
        <main className={"content-dark"}>
          <div className={"app-bar-spacer"} />
          {spinner && (
            <div id="spinner-live" className="spinner">
              <CircularProgress />
            </div>
          )}
          <List />
          <Insert onSpinner={handleSpinner} />
          <Footer />
        </main>
      </div>
    </React.Fragment>
  );
}
