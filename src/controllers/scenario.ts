import { ICard } from "./game.interfaces";

export default interface GameScenario {
  cards: ICard[];
  selectedCards: ICard[];
  score: number;
  gameOver: boolean;
}
