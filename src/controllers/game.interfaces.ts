export interface IGameRepo {
  getCharacters(limit: number): Promise<ICharacter[]>;
}

export interface ICharacter {
  id: number;
  name: string;
  spriteURL: string;
}

export interface ICard {
  pokemonId: number;
  name: string;
  spriteURL: string;
  flipped: boolean;
  clickable: boolean;
  id: number;
}

export interface IGameState {
  cards: ICard[];
  selectedCards: number[];
  score: number;
  started: boolean;
  gameOver: boolean;
  timer: number;
}
