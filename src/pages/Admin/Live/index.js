import React, { useState } from "react";

import "./styles.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { CircularProgress } from "@material-ui/core";
import List from '../../../components/Live/Admin/List'

export default function Live() {

  const [spinner, setEventSpinner] = useState(false);

  function handleSpinner(event) {
    setEventSpinner(event);
  }

  return (
    <React.Fragment>
      <div className={"d-flex"}>
        <Header title={"Admin - Lives"} />
        <main className={"content-dark"}>
          <div className={"app-bar-spacer"} />
          {spinner && (
            <div id="spinner-live" className="spinner">
              <CircularProgress />
            </div>
          )}
          <List onSpinner={handleSpinner}/>          
          <Footer />
        </main>
      </div>
    </React.Fragment>
  );
}
