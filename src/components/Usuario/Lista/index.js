import {
  CardContent,
  CircularProgress,
  Container,
  Grid,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import api from "../../../services/api.js";
import { SimpleSwal } from "../../../helpers/SwalFeedBack";
import { useHistory } from "react-router";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { Card } from "@material-ui/core";
import "./style.css";

export default function Lista() {
  const [items, setItems] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [spinner, setSpinner] = useState(true);
  const history = useHistory();
  const columns = [
    { field: "id", headerName: "#", width: 90 },
    { field: "name", headerName: "Nome", width: 250 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "cpf", headerName: "CPF", width: 180 },
    { field: "instagram", headerName: "Instagram", width: 250 },
    { field: "facebook", headerName: "Facebook", width: 250 },
  ];
  const [pageSize, setPageSize] = React.useState(50);

  const handleRowClick = React.useCallback((params) => {
    history.push({
      pathname: "/admin/usuario/profile/"+params.row.id,
      // state: { id: params.row.id },
    });
  }, []);

  useEffect(() => {
    api
      .get("api/v1/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status && response.data.status === (401 || 498)) {
          localStorage.clear();
          SimpleSwal(
            "<strong>Atenção</strong>",
            response.data.message,
            "warning"
          );
          history.push("/");
        } else {
          setItems(response.data.data);
        }
        setSpinner(false);
      })
      .catch((error) => {
        localStorage.clear();
        SimpleSwal("<strong>Atenção</strong>", error, "warning");
        history.push("/");
      });
  }, [token, history]);

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (
    <div>
      {spinner && (
        <div id="spinner-live" className="spinner">
          <CircularProgress />
        </div>
      )}
      <Container maxWidth="xl" className={"container"}>
        <Grid container>
          <Grid item xs={12}>
            <Card className="card">
              <CardContent>
                <div style={{ height: "100%", width: "100%" }}>
                  <DataGrid
                    // {...items}
                    rows={items}
                    columns={columns}
                    pagination
                    pageSize={pageSize}
                    onPageSizeChange={handlePageSizeChange}
                    autoHeight={true}
                    onRowClick={handleRowClick}
                    components={{
                      Toolbar: GridToolbar,
                    }}
                    filterModel={{
                      items: [
                        {
                          columnField: "",
                          operatorValue: "",
                          value: "",
                        },
                      ],
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
