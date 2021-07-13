import React from "react";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import "./style.css";

export default function Error404() {
  return (
    <div className="container justify-content-center center">
      <div className="row">
        <div className="col-12 text-center">
          <h1>
            <SentimentDissatisfiedIcon className="icon-nosmile mt-5" />
          </h1>

          <h1 className="text-white mt-2 mb-5">404 - Not Found</h1>
          <div className="row m-0 mb-5">
            <div className="col-md-4 pb-1 bg-dark"></div>
            <div className="col-md-4 pb-1 bg-primary"></div>
            <div className="col-md-4 pb-1 bg-danger"></div>
          </div>
          <h2 className="text-white">
            Não encontramos o que você está procurando
          </h2>
        </div>
      </div>
    </div>
  );
}
