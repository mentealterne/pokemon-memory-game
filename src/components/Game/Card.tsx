import { observer } from "mobx-react-lite";
import { FunctionComponent, useEffect, useState } from "react";
import { ICard } from "../../controllers/game.interfaces";
import { motion } from "framer-motion";
import store from "../../models/models";

interface IProps {
  card: ICard;
  onClick: (card: ICard) => void;
}

const Card: FunctionComponent<IProps> = ({ card, onClick }) => {
  const [flipped, setFlipped] = useState(card.flipped);

  useEffect(() => {
    setFlipped(card.flipped);
  }, [card.flipped]);

  const onCardClick = () => {
    if (!card.clickable) return;
    if (store.gameOver) return;
    onClick(card);
    setFlipped(!card.flipped);
  };

  const variants = {
    open: { rotateY: 180 },
    closed: { rotateY: 360 },
  };

  return (
    <motion.div
      animate={flipped ? "open" : "closed"}
      variants={variants}
      transition={{
        opacity: { delay: 0.5 + card.id / 100 },
        rotateY: { duration: 0.2 },
      }}
      whileHover={{
        scale: 1.2,
      }}
      className="cursor-pointer bg-white/25 rounded-md shadow-md-4 p-4 w-48 h-64 flex flex-col items-center justify-center"
      onClick={() => onCardClick()}
    >
      <img
        src={
          flipped ? card.spriteURL : process.env.PUBLIC_URL + "/pokeball.png"
        }
        className="w-24   object-cover mx-auto"
      />
    </motion.div>
  );
};

export default observer(Card);
