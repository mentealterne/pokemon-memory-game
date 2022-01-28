import React, { useEffect, useState } from "react";
import "./App.css";
import MainBoard from "./components/Game/MainBoard";
import { ICard } from "./controllers/game.interfaces";
import gameController from "./contexts/game.context";
import store from "./models/models";
import { applySnapshot } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import { values } from "mobx";

function App() {
  const fetchCards = async () => {
    await gameController.setupCards(10);
    gameController.getState().cards.map((card) => {
      store.addCard(card);
    });
  };
  useEffect(() => {
    fetchCards();

    setTimeout(() => {
      gameController.hideCards();
      applySnapshot(store.cards, gameController.getState().cards);
    }, 3000);
  }, []);
  return <MainBoard></MainBoard>;
}

const observableApp = observer(App);

export default App;
