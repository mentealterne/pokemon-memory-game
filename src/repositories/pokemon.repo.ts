import { ICharacter } from "../controllers/game.interfaces";

export default class PokemonRepository {
  apiRoot: string = "https://pokeapi.co/api/v2/";
  requestLimit: number = 60;

  async getCharacters(charactersLimit: number): Promise<ICharacter[]> {
    const pokemons: ICharacter[] = [];
    const pokemonListRequest = await fetch(
      `${this.apiRoot}pokemon?limit=${this.requestLimit}`
    );
    const pokemonListResponse = await pokemonListRequest.json();

    for (const pokemonItem of pokemonListResponse.results) {
      const pokemon = await this.getCharacter(pokemonItem.url);
      pokemons.push(pokemon);
    }

    return pokemons.splice(0, charactersLimit);
  }

  private async getCharacter(characterUrl: string): Promise<ICharacter> {
    const characterRequest = await fetch(characterUrl);
    const characterResponse = await characterRequest.json();

    return {
      id: characterResponse.id,
      name: characterResponse.name,
      spriteURL: characterResponse.sprites.front_default,
    };
  }
}
