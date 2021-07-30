import React, { useState } from "react";
import {
  CircularProgress,
} from "@material-ui/core";
import Header from "../../components/Header";
import "./styles.css";
import Footer from "../../components/Footer";
import List from "../../components/Live/List";

export default function Lives() {
  const [spinner, setEventSpinner] = useState(false);

  function handleSpinner(event) {
    setEventSpinner(event);
  }

  return (
    <React.Fragment>
      <div className={"d-flex"}>
        <Header title={"Lives"} />
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
