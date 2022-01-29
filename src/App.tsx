import React, { useEffect, useState } from "react";
import "./App.css";
import MainBoard from "./components/Game/MainBoard";
import { ICard } from "./controllers/game.interfaces";
import gameController from "./contexts/game.context";
import store from "./models/models";
import { applySnapshot } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import { values } from "mobx";
import Intro from "./components/Game/Intro";

const audio = new Audio(process.env.PUBLIC_URL + "/pokemon-ost.mp3");
function App() {
  const fetchCards = async () => {
    await gameController.setupCards(6);
    gameController.getState().cards.map((card) => {
      store.addCard(card);
    });
  };
  useEffect(() => {
    audio.play();
    if (!store.started) return;
    fetchCards();

    setTimeout(() => {
      gameController.hideCards();
      applySnapshot(store.cards, gameController.getState().cards);
    }, 3000);
  }, [store.started]);

  return (
    <div className=" w-screen h-screen bg-gradient-to-r from-amber-300 to-amber-500	 items-center justify-center flex flex-row">
      {!store.started ? <Intro /> : <MainBoard />}
    </div>
  );
}

export default observer(App);
