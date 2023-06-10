export const isPieceDark = (id: number) => {
  return ((id / 8) >> 0) % 2;
};

export const isPieceLarge = (id: number) => {
  return ((id / 4) >> 0) % 2;
};

export const isPieceSquare = (id: number) => {
  return ((id / 2) >> 0) % 2;
};

export const isPieceFilled = (id: number) => {
  return id % 2;
};
