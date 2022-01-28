import GameController from "../controllers/game.controller";
import PokemonRepository from "../repositories/pokemon.repo";

const gameController = GameController.createGame(new PokemonRepository());

export default gameController;
