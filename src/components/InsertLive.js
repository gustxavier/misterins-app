import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

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
        <div className="form">
            <strong>Cadastrar Live</strong>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    name="liveTitle"
                    id="liveTitle"
                    label="Título da live"
                    className="TextFieldBlock"
                    value={liveTitle}
                    onChange={e => setLiveTitle(e.target.value)}
                    required
                />
                <TextField
                    name="liveUrl"
                    id="liveUrl"
                    label="URL da Live"
                    className="TextFieldBlock"
                    value={liveUrl}
                    onChange={e => setLiveUrl(e.target.value)}
                    required
                />
                <TextField
                    name="liveDescription"
                    id="standard-textarea"
                    label="Descrição da Live"
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
