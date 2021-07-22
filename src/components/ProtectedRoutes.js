import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { simpleSwal } from "../helpers/SwalFeedBack";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token == null) {
      simpleSwal(
        "<strong>Atenção</strong>",
        "Sua conexão expirou. Faça login novamente.",
        "warning"
      );
    }
  }, [token]);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;
