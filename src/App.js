import { useState, useEffect } from "react";

import "./App.css";

const squares = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const fields = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];

const App = () => {
  const [boardStatus, setBoardStatus] = useState(fields);
  const [gameWon, setGameWon] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  const gameClass = gameStart && !gameWon ? "game active" : "game  ";

  const shuffleSquares = () => {
    let board = [...fields];
    for (let j = 0; j < 1000; j++) {
      for (let i = 0; i <= 15; i++) {
        if (board[i] == null) {
          let whichSquare = i;
          // empty square is right square
          if (
            whichSquare === 3 ||
            whichSquare === 7 ||
            whichSquare === 11 ||
            whichSquare === 15
          ) {
            if (whichSquare === 3) {
              let availableSlots = [-1, 4];
              let selectedNeighbour =
                i + availableSlots[Math.floor(Math.random() * 2)];
              board[i] = board[selectedNeighbour];
              board[selectedNeighbour] = null;
            } else if (whichSquare === 15) {
              let availableSlots = [-1, -4];
              let selectedNeighbour =
                i + availableSlots[Math.floor(Math.random() * 2)];
              board[i] = board[selectedNeighbour];
              board[selectedNeighbour] = null;
            } else {
              let availableSlots = [-4, -1, 4];
              let selectedNeighbour =
                i + availableSlots[Math.floor(Math.random() * 3)];
              board[i] = board[selectedNeighbour];
              board[selectedNeighbour] = null;
            }
          }

          // empty square is left square
          else if (
            whichSquare === 0 ||
            whichSquare === 4 ||
            whichSquare === 8 ||
            whichSquare === 12
          )
            if (whichSquare === 0) {
              let availableSlots = [1, 4];
              let selectedNeighbour =
                i + availableSlots[Math.floor(Math.random() * 2)];
              board[i] = board[selectedNeighbour];
              board[selectedNeighbour] = null;
            } else if (whichSquare === 12) {
              let availableSlots = [-4, 1];
              let selectedNeighbour =
                i + availableSlots[Math.floor(Math.random() * 2)];
              board[i] = board[selectedNeighbour];
              board[selectedNeighbour] = null;
            } else {
              let availableSlots = [-4, 1, 4];
              let selectedNeighbour =
                i + availableSlots[Math.floor(Math.random() * 3)];

              board[i] = board[selectedNeighbour];
              board[selectedNeighbour] = null;
            }
          //middle squares (those having four neighbours)
          else {
            let availableSlots = [-4, -1, 1, 4];
            let selectedNeighbour =
              i + availableSlots[Math.floor(Math.random() * 3)];

            board[i] = board[selectedNeighbour];
            board[selectedNeighbour] = null;
          }
        }
      }
    }

    setBoardStatus(board);
    setGameWon(false);
    setGameStart(true);
  };

  const handleClick = (e) => {
    let newState = [...boardStatus];
    let rightNeighbour = {
      element: document.getElementById(
        `square-${parseInt(e.target.attributes[2].value) + 1}`
      ),
      index: parseInt(e.target.attributes[2].value) + 1,
    };
    let leftNeighbour = {
      element: document.getElementById(
        `square-${parseInt(e.target.attributes[2].value) - 1}`
      ),
      index: parseInt(e.target.attributes[2].value) - 1,
    };
    let lowerNeighbour = {
      element: document.getElementById(
        `square-${parseInt(e.target.attributes[2].value) + 4}`
      ),
      index: parseInt(e.target.attributes[2].value) + 4,
    };
    let upperNeighbour = {
      element: document.getElementById(
        `square-${parseInt(e.target.attributes[2].value) - 4}`
      ),
      index: parseInt(e.target.attributes[2].value) - 4,
    };

    // //empty under

    if (
      lowerNeighbour.element !== null &&
      lowerNeighbour.element.innerHTML === ""
    ) {
      newState[lowerNeighbour.index] = newState[lowerNeighbour.index - 4];
      newState[lowerNeighbour.index - 4] = "";

      setBoardStatus(newState);
    }
    //empty over
    else if (
      upperNeighbour.element !== null &&
      upperNeighbour.element.innerHTML === ""
    ) {
      newState[upperNeighbour.index] = newState[upperNeighbour.index + 4];
      newState[upperNeighbour.index + 4] = "";

      setBoardStatus(newState);

      //empty left
    } else if (
      leftNeighbour.element !== null &&
      leftNeighbour.element.innerHTML === "" &&
      parseInt(e.target.attributes[2].value) !== 4 &&
      parseInt(e.target.attributes[2].value) !== 8 &&
      parseInt(e.target.attributes[2].value) !== 12
    ) {
      newState[leftNeighbour.index] = newState[leftNeighbour.index + 1];
      newState[leftNeighbour.index + 1] = "";

      setBoardStatus(newState);

      //empty right
    } else if (
      rightNeighbour.element !== null &&
      rightNeighbour.element.innerHTML === "" &&
      parseInt(e.target.attributes[2].value) !== 3 &&
      parseInt(e.target.attributes[2].value) !== 7 &&
      parseInt(e.target.attributes[2].value) !== 11
    ) {
      newState[rightNeighbour.index] = newState[rightNeighbour.index - 1];
      newState[rightNeighbour.index - 1] = "";

      setBoardStatus(newState);
    }
  };

  const checkWinner = () => {
    for (let i = 0; i < fields.length - 1; i++) {
      if (boardStatus[i] !== fields[i]) return;
    }
    setGameWon(true);
  };

  useEffect(checkWinner, [boardStatus]);

  const gameElement = (
    <div className={gameClass}>
      {squares.map((item) => {
        return (
          <div
            key={item}
            className="board"
            id={`square-${item}`}
            onClick={gameStart ? handleClick : null}
            index={item}
          >
            {boardStatus[item]}
          </div>
        );
      })}
    </div>
  );
  const starterButton = (
    <button onClick={shuffleSquares} disabled={gameStart && !gameWon}>
      Start game
    </button>
  );

  const winMessage =
    gameWon && gameStart ? (
      <h1 class="winMessage">Congratulations! Victory!</h1>
    ) : null;

  return (
    <div>
      {gameElement}
      {starterButton}
      {winMessage}
    </div>
  );
};

export default App;
