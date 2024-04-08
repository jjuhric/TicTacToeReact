import { useState } from "react";
import { GameBoard } from "./components/GameBoard";
import { Player } from "./components/Player";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

function getActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns[0]?.player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}


function App() {
  const [players, setPlayers] = useState({'X': 'Player 1', 'O': 'Player 2'}); // {'X': 'Player 1', 'O': 'Player 2
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = getActivePlayer(gameTurns);

  const initialGameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

  let gameBoard = [...initialGameboard.map(row => [...row])]; //Deep copy of the initial game board

  let winner;

  for (const turn of gameTurns) {
    const { square: { row, col }, player } = turn;
    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].col];
    const secondSquare = gameBoard[combination[1].row][combination[1].col];
    const thirdSquare = gameBoard[combination[2].row][combination[2].col];

    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = firstSquare;
      break;
    }
  }

  const isDraw = gameTurns.length === 9 && !winner;

  const handleChangingTurns = (rowIndex, cellIndex) => {
    setGameTurns(prevTurns => {

      const currentPlayer = getActivePlayer(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: cellIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    });
  };

  function handleReset() {
    setGameTurns([]);
  }

  const handlePlayerNameChange = (symbol, name) => {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: name
      };
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || isDraw) && <GameOver winner={players[winner]} onRestart={handleReset}/>}
        <GameBoard
          setActivePlayer={handleChangingTurns}
          board={gameBoard}
        />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App
