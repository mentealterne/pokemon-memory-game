import { FunctionComponent } from "react";
import CardsBoard from "./CardsBoard";
import { observer } from "mobx-react-lite";
import store from "../../models/models";
import GameStateBar from "./GameStateBar";

const MainBoard: FunctionComponent = () => {
  return (
    <div className=" mx-auto flex flex-col space-y-4 items-center justify-center">
      {store.cards.length ? (
        <>
          <CardsBoard />
          <GameStateBar />
        </>
      ) : (
        <span>Loading</span>
      )}
    </div>
  );
};

export default observer(MainBoard);
