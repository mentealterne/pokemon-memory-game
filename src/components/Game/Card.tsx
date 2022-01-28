import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import { ICard } from "../../controllers/game.interfaces";
import pokeball from "./pokeball.png";

interface IProps {
  card: ICard;
  onClick: (card: ICard) => void;
}

const Card: FunctionComponent<IProps> = ({ card, onClick }) => {
  return (
    <div
      className="bg-white rounded-md shadow-md-4 p-4 h-30"
      onClick={() => (card.clickable ? onClick(card) : null)}
    >
      {card.flipped ? (
        <p>{card.name}</p>
      ) : (
        <img src={pokeball} className="w-20  object-fit mx-auto" />
      )}
    </div>
  );
};

export default observer(Card);
