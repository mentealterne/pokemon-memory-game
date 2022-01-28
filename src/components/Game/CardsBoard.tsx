import { FunctionComponent, useEffect } from "react";
import { ICard } from "../../controllers/game.interfaces";
import Card from "./Card";
import gameController from "../../contexts/game.context";
import store from "../../models/models";
import { observer } from "mobx-react-lite";
import { applySnapshot } from "mobx-state-tree";

interface IProps {}

const flippa = (card: any) => {
  store.flipCard(card);
  setTimeout(
    () => applySnapshot(store.cards, gameController.getState().cards),
    1000
  );
};

const CardsBoard: FunctionComponent<IProps> = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {store.cards.map((card, index) => (
        <Card card={card} onClick={() => flippa(card)} />
      ))}
    </div>
  );
};
const CardsBoardObserver = observer(CardsBoard);
export default CardsBoardObserver;
