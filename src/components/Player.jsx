import { useState } from "react";

export function Player({ name, symbol }) {
    const [isEditing, setIsEditing] = useState(false);

    /* Best practice: use a separate function for event handlers */
    function handleEditClick(){
        setIsEditing(editing => !editing);
    } 

    let playerName = <span className="player-name">{name}</span>;
    let buttonCaption = "Edit";

    if (isEditing) {
        buttonCaption = "Save";
        playerName = <input type="text" required value={name} />;
    }

    return (
        <li>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{buttonCaption}</button>
        </li>
    )
}