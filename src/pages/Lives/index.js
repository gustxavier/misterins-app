import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  CircularProgress,
  Paper,
  Typography,
} from "@material-ui/core";
// import ChatMessage from "../../components/ChatMessage";
// import { SendSharp } from "@material-ui/icons";
// import { makeStyles } from "@material-ui/core/styles";
import Header from "../../components/Header";
import api from "../../services/api";
// import { simpleNoty } from "../../helpers/NotyFeedBack";
// import { forEach, isSet, map } from "lodash";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router";
// import { DataGrid } from "@material-ui/data-grid";
import "./styles.css";
import Footer from "../../components/Footer";
import ViewLive from "../../components/Live/View";

export default function Lives() {
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
          <ViewLive/>
          {/* <List /> */}
          {/* <Insert onSpinner={handleSpinner} /> */}
          <Footer />
        </main>
      </div>
    </React.Fragment>
  );
}
