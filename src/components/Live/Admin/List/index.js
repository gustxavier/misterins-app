import {
  CardContent,
  CircularProgress,
  Container,
  Grid,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { DataGrid,GridToolbar, ptBR } from "@material-ui/data-grid";
import { Card } from "@material-ui/core";
import "./style.css";
import { useParams } from "react-router-dom";
import api from "../../../../services/api";
import { simpleSwal } from "../../../../helpers/SwalFeedBack";

export default function List() {
  const params = useParams();
  const [items, setItems] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [spinner, setSpinner] = useState(true);
  const history = useHistory();
  const columns = [
    { field: "id", headerName: "#", width: 90 },
    { field: "title", headerName: "Título", width: 450 },
    { field: "url", headerName: "Link", width: 800 },
    { field: "is_active", headerName: "Ativo?", width: 120 },
  ];
  const [pageSize, setPageSize] = React.useState(25);

  const handleRowClick = React.useCallback(
    (params) => {
      history.push({
        pathname: "/admin/live/" + params.row.id,
      });
    },
    [history]
  );

  useEffect(() => {
    api
      .get("lives", {
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
  }, [token, history, params]);

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
                    rows={items}
                    columns={columns}
                    pagination
                    pageSize={pageSize}
                    localeText={ptBR.props.MuiDataGrid.localeText}
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
