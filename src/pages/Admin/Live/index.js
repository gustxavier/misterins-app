import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UpdateLive from "../../../components/Live/UpdateLive";

import "./styles.css";
import Header from "../../../components/Header";

export default function Live() {
  const [token] = useState(localStorage.getItem("token"));
  const history = useHistory();

  useEffect(() => {
    
  }, [token, history]);

  return (
    <React.Fragment>
      <div className={"d-flex"}>
        <Header title={"Admin - Live"} />
        <main className={"content-dark"}>
          <div className={"app-bar-spacer"} />
          <UpdateLive />          
        </main>
      </div>
    </React.Fragment>
  );
}
