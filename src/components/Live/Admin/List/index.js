import {
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { DataGrid, GridToolbar, ptBR } from "@material-ui/data-grid";
import { Card } from "@material-ui/core";
import "./style.css";
import { useParams } from "react-router-dom";
import api from "../../../../services/api";
import { simpleSwal } from "../../../../helpers/SwalFeedBack";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Insert from "../Insert";
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

export default function List() {
  const params = useParams();
  const [items, setItems] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [spinner, setSpinner] = useState(true);
  const history = useHistory();

  const columns = [
    { field: "id", headerName: "#", width: 90 },
    { field: "title", headerName: "Título", width: 450 },
    { field: "url", headerName: "Link", width: 750 },
    {
      field: "is_active",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <div>
          {params.value === "Y" ? (
            <Tooltip title="Ativo" aria-label="add">
              <span className="badge bg-success w-100"><CheckCircleIcon className="text-center" /> Ativo</span>
            </Tooltip>
          ) : (
            <Tooltip title="Inativo" aria-label="add">
            <span className="badge bg-warning text-dark"><ReportProblemIcon className="text-center text-dark" /> Inativo</span>
            </Tooltip>
          )}
        </div>
      ),
    },
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
              <Typography variant="h6" className="text-white d-inline">Lives</Typography>        
              <Insert/>
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
