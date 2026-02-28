import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import {useState} from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";    
import GameOver from "./components/GameOver";
const initialPlayers={
  X: "Player 1",
  O: "Player 2"
};
const initialGameboard = [[null, null, null], [null, null, null], [null, null, null]];
function deriveActivePlayer(gameTurns){
   let currentPLayer= "X";
      if(gameTurns.length>0 && gameTurns[0].player==="X"){
        currentPLayer="O";
      }
      return currentPLayer;
    }
    function deriveWinner(gameboard, players){
      let winner;
  for (const combination of WINNING_COMBINATIONS){
    console.log("Checking combination", combination);
    const firstSquare=gameboard[combination[0].row][combination[0].column];
    const secondSquare=gameboard[combination[1].row][combination[1].column];
    const thirdSquare=gameboard[combination[2].row][combination[2].column];
    if(firstSquare && firstSquare===secondSquare && firstSquare===thirdSquare){
      winner=players[firstSquare];
      console.log("We have a winner", winner);
  }
}
      return winner;
    }
    function deriveGameBoard(gameTurns){
      let gameboard=[...initialGameboard.map(array => [...array])];
    for (const turn of gameTurns){
        const {square,player}=turn;
        const {row,col}=square;
        gameboard[row][col]=player;
    }
    return gameboard;
  }

function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [gameTurns, setGameTurns] = useState([]);
 // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer=deriveActivePlayer(gameTurns);
  const gameboard=deriveGameBoard(gameTurns);
  
  function handleSelectSquare(rowIndex, colIndex) {
   // setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
    setGameTurns((prev) => {
      const currentPLayer=deriveActivePlayer(prev);
      const updatedTurns=[{square: {row:rowIndex,col:colIndex},player:currentPLayer},...prev];
      return updatedTurns;
    });
  }
  function handleRestartGame() {
    setGameTurns([]);
  }
  const winner=deriveWinner(gameboard, players);
  const hasDraw=gameTurns.length===9 && !winner;
  function handlePlayerNameChange(playerSymbol, newName) {
    setPlayers(prev => {
      return {
      ...prev,
      [playerSymbol]: newName
  };
  });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player onChangeName={handlePlayerNameChange} name={players.X} symbol="X" isActive={activePlayer==="X"}/>
          <Player  onChangeName={handlePlayerNameChange} name={players.O} symbol="O" isActive={activePlayer==="O"}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestartGame={handleRestartGame} />}
        <Gameboard onSelectSquare={handleSelectSquare}  board={gameboard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
