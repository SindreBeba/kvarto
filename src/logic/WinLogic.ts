import {
  isPieceDark,
  isPieceFilled,
  isPieceLarge,
  isPieceSquare,
} from "./PieceLogic";

export const checkWinConditions = (board: number[][]) => {
  // Check rows
  for (let row = 0; row < board.length; row++) {
    if (checkPieces(board[row])) return true;
  }

  // Check columns
  for (let col = 0; col < board[0].length; col++) {
    const column = board.map((value) => {
      return value[col];
    });
    if (checkPieces(column)) return true;
  }

  // Check top-left diagonal
  const topLeftDiagonal = board.map((value, index) => {
    return value[index];
  });
  if (checkPieces(topLeftDiagonal)) return true;

  // Check top-right diagonal
  const topRightDiagonal = board.map((value, index) => {
    return value[value.length - index - 1];
  });
  if (checkPieces(topRightDiagonal)) return true;

  // Return false if no win conditions were met
  return false;
};

const checkPieces = (pieces: number[]): boolean => {
  const attributeCallbacks = [
    isPieceDark,
    isPieceLarge,
    isPieceSquare,
    isPieceFilled,
  ];

  for (let i = 0; i < attributeCallbacks.length; i++) {
    if (checkAttribute(pieces, attributeCallbacks[i])) return true;
  }

  return false;
};

const checkAttribute = (
  pieces: number[],
  isAttribute: (id: number) => number
): boolean => {
  // Game is not won if first cell is blank
  if (pieces[0] == -1) return false;
  const firstValue = isAttribute(pieces[0]);

  for (let i = 1; i < pieces.length; i++) {
    // Game is not won if any of the cells are blank
    if (pieces[i] == -1) return false;
    // Game is not won if any of the cells don't match the first cell
    if (isAttribute(pieces[i]) != firstValue) return false;
  }

  return true;
};
