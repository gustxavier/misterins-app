import React from "react";
import WarningIcon from "@material-ui/icons/Warning";
import "./style.css";

export default function Maintenance() {
  return (
    <div className="container justify-content-center center">
      <div className="row">
        <div className="col-12 text-center">
          <h1>
            <WarningIcon className="icon-warning mt-5" />
          </h1>

          <h1 className="text-white mt-2 mb-5">Manutenção</h1>
          <div className="row m-0 mb-5">
            <div className="col-md-4 pb-1 bg-dark"></div>
            <div className="col-md-4 pb-1 bg-primary"></div>
            <div className="col-md-4 pb-1 bg-danger"></div>
          </div>
          <h2 className="text-white">
            Estamos atualizando nosso sistema com algumas melhorias.
            <br /> Em alguns instantes estaremos de volta.
            <br />
            <br /> Aguarde!
          </h2>
        </div>
      </div>
    </div>
  );
}
