import React, { useState } from 'react';
import { TextField, Typography  } from '@material-ui/core';

export default function InsertList({ onInsertList }) {
  const [listName, setListName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onInsertList({
      "title": listName,
	    "status": 0
    });

    setListName("");
  };

  return (
    <div className="form card">
      <Typography><strong>Cadastrar Lista</strong></Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
          name="listName" 
          id="listName" 
          label="Titulo da Lista de Tarefas"
          variant="outlined"
          className="TextFieldBlock" 
          value={listName}
          onChange={e => setListName(e.target.value)}
          required
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}