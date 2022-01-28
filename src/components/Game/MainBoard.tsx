import { FunctionComponent } from "react";
import GameController from "../../controllers/game.controller";
import { ICard } from "../../controllers/game.interfaces";
import CardsBoard from "./CardsBoard";
import { observer } from "mobx-react-lite";
import { values } from "mobx";
import store from "../../models/models";

interface IProps {}

const MainBoard: FunctionComponent<IProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-300">
      <CardsBoard />
    </div>
  );
};

export default MainBoard;
