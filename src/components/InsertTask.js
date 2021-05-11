import React, { useState, useEffect } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@material-ui/core';

export default function InsertTask({ onInsertTask, taskList }) {
  const [lists, setLists] = useState([]);
  const [selectList, setSelectList] = useState("");
  const [taskName, setTaskName] = useState("");
  
  useEffect(() => {
    if(taskList.length > 0){
      setLists(taskList);
    }
  }, [taskList]);

  const handleChangeSelect = (event) => {
    setSelectList(event?.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onInsertTask({
      "list_id": selectList,
      "title": taskName,
      "status": 0
    });

    setSelectList("");
    setTaskName("");
  };

  return (
    <div className="form card">
      <Typography><strong>Cadastrar Tarefa</strong></Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <TextField 
            name="taskName" 
            id="taskName" 
            label="Titulo da Lista de Tarefas"
            variant="outlined"
            className="TextFieldBlock" 
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
            required
          />
        </div>
        <div className="selectBox">
          <FormControl className="fullWidth">
            <InputLabel id="select-list-label">Selecionar Lista</InputLabel>
            <Select
              labelId="select-list-label"
              id="select-list"
              name="taskList" 
              variant="outlined"
              value={selectList}
              onChange={handleChangeSelect}
            >
              {lists.length > 0 ? lists.map((list) => 
                (
                  <MenuItem key={list.id} value={list.id}>{list.title}</MenuItem>
                )
              ): null }
            </Select>
          </FormControl>
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}