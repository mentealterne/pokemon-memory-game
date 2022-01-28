import { types, getSnapshot, applySnapshot, onPatch } from "mobx-state-tree";
import gameController from "../contexts/game.context";
import { ICard } from "../controllers/game.interfaces";

const Card = types
  .model({
    index: 0,
    id: 0,
    name: "",
    spriteURL: "",
    flipped: false,
    clickable: false,
  })
  .actions((self) => ({
    flipCard() {
      gameController.flipCard(self);
      self.flipped = !self.flipped;
      self.clickable = !self.clickable;
    },
  }));

const GameState = types
  .model({
    gameOver: false,
    score: 0,
    selectedCards: types.array(Card),
    cards: types.array(Card),
  })
  .actions((self) => ({
    addCard(card: ICard) {
      self.cards.push(card);
    },
    addSelectedCard(card: ICard) {
      self.selectedCards.push(card);
    },

    flipCard(card: any) {
      card.flipCard();

      console.log(self.selectedCards.length);
    },
  }));

const store = GameState.create({
  cards: [],
  gameOver: gameController.getState().gameOver,
  score: gameController.getState().score,
});

export default store;
