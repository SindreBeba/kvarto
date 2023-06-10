import "./GamePiece.scss";
import darkCircleFilled from "../../assets/images/darkCircleFilled.png";
import darkCircleHollow from "../../assets/images/darkCircleHollow.png";
import darkSquareFilled from "../../assets/images/darkSquareFilled.png";
import darkSquareHollow from "../../assets/images/darkSquareHollow.png";
import lightCircleFilled from "../../assets/images/lightCircleFilled.png";
import lightCircleHollow from "../../assets/images/lightCircleHollow.png";
import lightSquareFilled from "../../assets/images/lightSquareFilled.png";
import lightSquareHollow from "../../assets/images/lightSquareHollow.png";

export interface GamePieceProps {
  id: number;
  isSelected?: boolean;
}

export const GamePiece = (props: GamePieceProps) => {
  // The attributes of the game piece is decided by the binary representation of the id. The id
  // can be between 0 and 15, meaning its binary representation consists of 4 digits, e.g. 1011.
  //   First digit:   1 = dark,   0 = light
  //   Second digit:  1 = large,  0 = small
  //   Third digit:   1 = square, 0 = circle
  //   Fourth digit:  1 = filled, 0 = hollow

  // Calculate the size, and determine the classes.
  const size = ((props.id / 4) >> 0) % 2 ? "large" : "small";
  const imageClassName = size + (props.isSelected ? " isSelected" : "");

  // Calculate the shape and if the piece is filled or hollow, and determine the image source.
  const isDark = ((props.id / 8) >> 0) % 2;
  const isSquare = ((props.id / 2) >> 0) % 2;
  const isFilled = props.id % 2;
  let imageSource;
  if (isDark) {
    if (isSquare) {
      imageSource = isFilled ? darkSquareFilled : darkSquareHollow;
    } else {
      imageSource = isFilled ? darkCircleFilled : darkCircleHollow;
    }
  } else {
    if (isSquare) {
      imageSource = isFilled ? lightSquareFilled : lightSquareHollow;
    } else {
      imageSource = isFilled ? lightCircleFilled : lightCircleHollow;
    }
  }

  return <img className={imageClassName} src={imageSource}></img>;
};
