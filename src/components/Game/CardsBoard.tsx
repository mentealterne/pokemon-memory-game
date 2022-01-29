import { FunctionComponent, useEffect } from "react";
import { ICard } from "../../controllers/game.interfaces";
import Card from "./Card";
import store from "../../models/models";
import { observer } from "mobx-react-lite";

const CardsBoard: FunctionComponent = () => {
  return (
    <div className="grid grid-cols-4 items-center justify-center gap-10">
      {store.cards.map((card, index) => (
        <Card card={card} onClick={() => card.flipCard()} />
      ))}
    </div>
  );
};
export default observer(CardsBoard);
