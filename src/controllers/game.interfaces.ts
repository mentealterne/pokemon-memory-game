export interface IGameRepo {
  getCharacters(limit: number): Promise<ICharacter[]>;
}

export interface ICharacter {
  id: number;
  name: string;
  spriteURL: string;
}

export interface ICard extends ICharacter {
  flipped: boolean;
  clickable: boolean;
  index: number;
}
