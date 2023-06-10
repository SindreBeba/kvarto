import "./GameBoard.scss";
import { GamePiece } from "./GamePiece";

export interface GameBoardProps {
  board: number[][];
  onClick: (rowIndex: number, cellIndex: number) => void;
}

export const GameBoard = (props: GameBoardProps) => {
  return (
    <div className="board">
      {props.board.map((row: number[], rowIndex) => (
        <div className="boardRow">
          {row.map((cell, cellIndex) => (
            <div
              className="boardCell"
              onClick={() => props.onClick(rowIndex, cellIndex)}
            >
              {cell >= 0 ? <GamePiece id={cell} /> : <></>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
