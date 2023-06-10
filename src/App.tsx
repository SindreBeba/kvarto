import "./App.scss";
import { render } from "react-dom";
import { GameBoard } from "./components/GameBoard";
import { SelectablePieces } from "./components/SelectablePieces";
import { checkWinConditions } from "./logic/WinLogic";
import { useState, useEffect } from "react";

const App = () => {
  // The player currently making a move, either 1 or 2
  const [currentPlayer, setCurrentPlayer] = useState(1);
  // This variable is true if the game is won by a player
  const [gameOver, setGameOver] = useState(false);
  // The game board is represented as a 4x4 matrix of numbers where the numbers are the GamePiece IDs
  const [board, setBoard] = useState([[0]]);
  // The game pieces available for selection are stored in a number array where the numbers are
  // the GamePiece IDs
  const [pieces, setPieces] = useState([0]);
  const [selectedPiece, setSelectedPiece] = useState(-1);

  const emptyBoard = [
    new Array<number>(4).fill(-1),
    new Array<number>(4).fill(-1),
    new Array<number>(4).fill(-1),
    new Array<number>(4).fill(-1),
  ];

  useEffect(() => {
    setBoard(emptyBoard);
    setPieces([...Array(16).keys()]);
  }, []);

  const resetState = () => {
    setCurrentPlayer(1);
    setGameOver(false);
    setBoard(emptyBoard);
    setPieces([...Array(16).keys()]);
    setSelectedPiece(-1);
  };

  const nextPlayer = () => {
    if (currentPlayer == 1) {
      setCurrentPlayer(2);
    } else {
      setCurrentPlayer(1);
    }
  };

  const onGamePieceClick = (id: number) => {
    // If the game is over, a player can't move a piece
    if (gameOver) return;
    setSelectedPiece(id);
  };

  const onGameBoardCellClick = (rowIndex: number, cellIndex: number) => {
    // If the game is over, a player can't move a piece
    if (gameOver) return;
    if (selectedPiece < 0) return;
    // First, create a new row array with the updated piece
    const updateRow = board[rowIndex];
    updateRow[cellIndex] = selectedPiece;
    // Then, update the board with the row
    const updateBoard = board;
    board[rowIndex] = updateRow;
    setBoard([...updateBoard]);
    // Remove the selected piece from available pieces
    const updatePieces = pieces;
    updatePieces[selectedPiece] = -1;
    setPieces([...updatePieces]);
    setSelectedPiece(-1);
    // Check win conditions to see if game is over
    if (checkWinConditions(board)) {
      setGameOver(true);
      return;
    }
    nextPlayer();
  };

  return (
    <>
      <div id="container">
        <h1>Kvarto</h1>
        <GameBoard board={board} onClick={onGameBoardCellClick} />
        {gameOver ? (
          <div className="gameMessage">
            <p>Player {currentPlayer} won!</p>
            <button onClick={resetState}>Play again!</button>
          </div>
        ) : (
          <div className="gameMessage">
            <p className="selectPieceText">
              Player {currentPlayer}: Select a piece and place it on the board!
            </p>
          </div>
        )}
        <SelectablePieces
          onClick={onGamePieceClick}
          pieces={pieces}
          selectedPieceId={selectedPiece}
        />
      </div>
    </>
  );
};

render(<App />, document.getElementById("root"));
