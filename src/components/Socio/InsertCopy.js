import React, { useState } from "react";
import { TextField, Typography } from "@material-ui/core";
import api from "../../services/api";
import { SimpleSwal } from "../../helpers/SwalFeedBack";
import { SimpleNoty } from "../../helpers/NotyFeedBack";
import { useHistory } from "react-router-dom";

export default function InsertCopy() {
  const [title, setTitle] = useState("");
  const [important_text, setImportantText] = useState("");
  const [description, setDescription] = useState("");
  const [token] = useState(localStorage.getItem("token"));
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data
    data = {title,important_text,description}
    api
      .post("copy", data, {
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
          SimpleNoty("Sucesso!", "success");
          history.push("/admin/socio");
        }
      });
  };

  return (
    <div className="form card">
      <Typography>
        <strong>Adicionar Copy</strong>
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="Título da copy"
          variant="outlined"
          name="title"
          id="title"
          className="TextFieldBlock"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Texto Importante"
          variant="outlined"
          name="important_text"
          id="important_text"
          className="TextFieldBlock"
          value={important_text}
          onChange={(e) => setImportantText(e.target.value)}
          required
          multiline
          rows={2}
        />
        <TextField
          label="Descrição"
          variant="outlined"
          name="liveDescription"
          id="standard-textarea"
          className="TextFieldBlock"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={2}
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}
