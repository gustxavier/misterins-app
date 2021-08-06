import React from "react";
import Header from "../../../components/Header";
import "./styles.css";
import Footer from "../../../components/Footer";
// import { CircularProgress } from "@material-ui/core";
// import Insert from "../../../components/Socio/Copy/Admin/Insert";
import ListCopy from "../../../components/Socio/Copy/Admin/List";
import ListVideo from "../../../components/Socio/Video/Admin/List";

export default function Socio() {
  // const [spinner, setEventSpinner] = useState(false);

  // function handleSpinner(event) {
  //   setEventSpinner(event);
  // }

  return (
    <React.Fragment>
      <div className={"d-flex"}>
        <Header title={"Admin - Sócio"} />
        <main className={"content-dark"}>
          <div className={"app-bar-spacer"} />
          {/* {spinner && (
            <div id="spinner-live" className="spinner">
              <CircularProgress />
            </div>
          )} */}
          <ListCopy />
          <ListVideo />
          <Footer />
        </main>
      </div>
    </React.Fragment>
  );
}
