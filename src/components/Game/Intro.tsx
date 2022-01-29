import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { FunctionComponent, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import store from "../../models/models";

const Intro: FunctionComponent = () => {
  const paragraphs = [
    "[Once upon a time pokemon used to live in a peaceful world.]",
    "[Very soon they would be hunted and captured for their rarity and preciousness.]",
    "[We as humans have caught them, and we as humans have to do something for them.]",
    "[Every pokemon has lost his memory and in order to save them... we have to help them recover their lost identity.]",
  ];

  const [startGame, setStartGame] = useState<boolean>(false);

  return (
    <div className=" container mx-auto flex flex-col space-y-4 items-center justify-center">
      <Typewriter
        {...{
          words: paragraphs,
          typeSpeed: 50,
          deleteSpeed: 10,
          delaySpeed: 1500,
          loop: 1,
          onLoopDone: () => {
            setStartGame(true);
          },
        }}
      />
      {startGame && (
        <motion.button
          onClick={() => store.startGame()}
          animate={{ opacity: 0 }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          Start
        </motion.button>
      )}
    </div>
  );
};

export default observer(Intro);
