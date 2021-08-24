import {
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import api from "../../../../services/api.js";
import { simpleSwal } from "../../../../helpers/SwalFeedBack";
import { useHistory } from "react-router";
import { DataGrid, GridToolbar, ptBR } from "@material-ui/data-grid";
import { Card } from "@material-ui/core";
import InserirCampanha from "../Insert";
import "./style.css";

export default function ListaCampanha() {
  const [items, setItems] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [spinner, setSpinner] = useState(true);
  const history = useHistory();
  const columns = [
    { field: "id", headerName: "#", width: 90 },
    { field: "name", headerName: "Nome", width: 250 },
    { field: "slug", headerName: "Slug", width: 400 },
    { field: "start", headerName: "Início", width: 250 },
    { field: "end", headerName: "Fim", width: 250 },
  ];
  const [pageSize, setPageSize] = React.useState(50);

  const handleRowClick = React.useCallback(
    (params) => {
      history.push({
        pathname: "/admin/mrzap/campaign/" + params.row.id,
      });
    },
    [history]
  );

  useEffect(() => {
    api
      .get("campaign", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status && response.data.status === (401 || 498)) {
          localStorage.clear();
          history.push("/");
        } else {
          setItems(response.data.data);
        }
        setSpinner(false);
      })
      .catch((error) => {
        localStorage.clear();
        simpleSwal("<strong>Atenção</strong>", error, "warning");
        history.push("/");
      });
  }, [token, history]);

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  const handleSpinner = (event) => {
    setSpinner(event);
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
                <Typography variant="h6" className="text-white d-inline">
                  Campanhas
                </Typography>
                <InserirCampanha onSpinner={handleSpinner} />
                <div style={{ height: "100%", width: "100%" }}>
                  <DataGrid
                    rows={items}
                    columns={columns}
                    pagination
                    pageSize={pageSize}
                    onPageSizeChange={handlePageSizeChange}
                    localeText={ptBR.props.MuiDataGrid.localeText}
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
