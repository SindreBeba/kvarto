import "./SelectablePieces.scss";
import { GamePiece } from "./GamePiece";

export interface SelectablePiecesProps {
  onClick: (id: number) => void;
  pieces: number[];
  selectedPieceId: number;
}

export const SelectablePieces = (props: SelectablePiecesProps) => {
  return (
    <>
      <div className="selectablePieces">
        {props.pieces.map((id: number) => (
          <div className="selectablePiece" onClick={() => props.onClick(id)}>
            {id >= 0 ? (
              <GamePiece id={id} isSelected={id == props.selectedPieceId} />
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
