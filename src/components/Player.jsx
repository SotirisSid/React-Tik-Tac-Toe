import {useState} from "react";

export default function Player({ name, symbol, isActive,onChangeName }) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);
    
    function handleEditClick() {
        setIsEditing((editing) => !editing);  
        if(isEditing){
        onChangeName(symbol, playerName);
        }
    } 
    function handleInputChange(event) {
        setPlayerName(event.target.value);
    }

let editablePlayername=<span className="player-name">{playerName}</span>;
if(isEditing){
    editablePlayername=<input type="text" required value={playerName} onChange={handleInputChange} />;
}
    return (
        <li className={isActive ? "active" : ""}>
            <span className="player">
            {editablePlayername}
           
          <span className="player-symbol">{symbol}
            </span>
            </span>
          <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button></li>
          
        );
        }
