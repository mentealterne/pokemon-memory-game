import { types, applySnapshot, cast } from "mobx-state-tree";
import gameController from "../contexts/game.context";
import { ICard } from "../controllers/game.interfaces";

const Card = types
  .model({
    id: types.number,
    pokemonId: types.number,
    name: types.string,
    spriteURL: types.string,
    flipped: types.boolean,
    clickable: types.boolean,
  })
  .actions((self) => ({
    flipCard() {
      gameController.flipCard(self);
      self.flipped = !self.flipped;
      self.clickable = !self.clickable;
      store.addToSelectedCards(self);
      if (store.selectedCards?.length === 2) {
        store.toggleClickable(false);
        setTimeout(() => applySnapshot(store, gameController.getState()), 1000);
      }
    },
  }));

const GameState = types
  .model({
    gameOver: types.boolean,
    score: types.number,
    selectedCards: types.maybe(types.array(types.number)),
    cards: types.array(Card),
    timer: types.number,
    started: types.boolean,
  })
  .actions((self) => ({
    addCard(card: ICard) {
      self.cards.push(card);
    },
    addToSelectedCards(card: ICard) {
      self.selectedCards?.push(card.id);
    },
    toggleClickable(clickable: boolean) {
      self.cards = cast(
        self.cards.map((card) => {
          return !card.flipped ? { ...card, clickable } : card;
        })
      );
    },
    startGame() {
      self.started = true;
      gameController.startGame();
    },
    setGameOver(isGameOver: boolean) {
      self.gameOver = isGameOver;
      gameController.setGameOver(isGameOver);
    },
  }));

const store = GameState.create({
  gameOver: gameController.getState().gameOver,
  cards: gameController.getState().cards,
  score: gameController.getState().score,
  selectedCards: gameController.getState().selectedCards,
  timer: gameController.getState().timer,
  started: gameController.getState().started,
});

export default store;
