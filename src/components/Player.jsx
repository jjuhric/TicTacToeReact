import { useState } from "react";

export function Player({ initialName, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName); // [state, setState
    const [isEditing, setIsEditing] = useState(false);

    /* Best practice: use a separate function for event handlers */
    function handleEditClick() {
        setIsEditing(editing => !editing);
        if(isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    let buttonCaption = "Edit";

    if (isEditing) {
        buttonCaption = "Save";
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{buttonCaption}</button>
        </li>
    )
}