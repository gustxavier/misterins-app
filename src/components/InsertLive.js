import React, { useState } from 'react';
import { TextField, Typography } from '@material-ui/core';

export default function InsertLive({ onInsertLive }) {
    const [liveTitle, setLiveTitle] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [liveDescription, setLiveDescription] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        await onInsertLive({
            'title': liveTitle,
            'url': liveUrl,
            'description': liveDescription
        });

        setLiveTitle("");
        setLiveUrl("");
        setLiveDescription("");
    };

    return (
        <div className="form card">
            <Typography><strong>Cadastrar Live</strong></Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    label="Título da live"
                    variant="outlined"
                    name="liveTitle"
                    id="liveTitle"
                    className="TextFieldBlock"
                    value={liveTitle}
                    onChange={e => setLiveTitle(e.target.value)}
                    required
                />
                <TextField
                    label="URL da Live"
                    variant="outlined"
                    name="liveUrl"
                    id="liveUrl"
                    className="TextFieldBlock"
                    value={liveUrl}
                    onChange={e => setLiveUrl(e.target.value)}
                    required
                />
                <TextField
                    label="Descrição da Live"
                    variant="outlined"
                    name="liveDescription"
                    id="standard-textarea"
                    className="TextFieldBlock"
                    value={liveDescription}
                    onChange={e => setLiveDescription(e.target.value)}
                    required
                    multiLine={true}
                    maxLength="200"
                />
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}
