import { observer } from "mobx-react-lite";
import { FunctionComponent, useEffect, useState } from "react";
import store from "../../models/models";

const GameStateBar: FunctionComponent = () => {
  const [timer, setTimer] = useState<number>();

  useEffect(() => {
    if (!store.timer) return;
    let timerRef = store.timer / 60;

    const decreaseTimer = setInterval(() => {
      if (store.gameOver) clearInterval(decreaseTimer);

      timerRef--;
      if (timerRef === 0) {
        clearInterval(decreaseTimer);
        store.setGameOver(true);
      }
      setTimer(timerRef);
    }, 1000);
  }, []);

  return (
    <div className=" flex flex-row justify-between w-full">
      <span>Score: {store.score}</span>
      <span>Timer: {timer}'</span>
      {store.gameOver ? (
        <span>
          {" "}
          Game Over, you{" "}
          {store.score === store.cards.length / 2 ? " Won!" : "lost"}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default observer(GameStateBar);
