import { ICard, IGameRepo, IGameState } from "./game.interfaces";

export default class GameController {
  private gameRepo: IGameRepo;
  private state: IGameState;

  private constructor(gameRepo: IGameRepo) {
    this.gameRepo = gameRepo;

    this.state = {
      cards: [],
      selectedCards: [],
      score: 0,
      gameOver: false,
      started: false,
      timer: 3600 * 2,
    };
  }

  setGameOver(isGameOver: boolean) {
    this.state.gameOver = isGameOver;
  }

  startGame() {
    this.state.started = true;
  }

  async setupCards(charactersLimit: number): Promise<void> {
    const characters = await this.gameRepo.getCharacters(charactersLimit);

    const cardSet: ICard[] = [...characters, ...characters].map(
      (character, index) => {
        return {
          pokemonId: character.id,
          name: character.name,
          spriteURL: character.spriteURL,
          flipped: true,
          clickable: false,
          id: index,
        };
      }
    );

    this.setState({
      ...this.state,
      started: true,
      cards: this.shuffle([...cardSet]),
    });
  }

  hideCards(): void {
    this.setState({
      ...this.state,
      cards: this.state.cards.map((card) => {
        return { ...card, flipped: false, clickable: true };
      }),
    });
  }

  private setState(newState: IGameState): void {
    this.state = newState;
  }

  getState(): IGameState {
    return this.state;
  }

  addToSelectedCards(card: ICard) {
    if (this.state.selectedCards.length < 2) {
      this.setState({
        ...this.state,
        selectedCards: [...this.state.selectedCards, card.pokemonId],
      });
    }
  }

  checkGameOver() {
    if (this.state.score === this.state.cards.length / 2) {
      this.setState({
        ...this.state,
        gameOver: true,
      });
    }
  }

  checkMatch() {
    const [firstCardId, secondCardId] = this.state.selectedCards;
    if (firstCardId === secondCardId) {
      this.setState({
        ...this.state,
        score: this.state.score + 1,
        selectedCards: [],
        cards: this.state.cards.map((card) => {
          if (card.pokemonId === firstCardId) {
            return { ...card, clickable: false, flipped: true };
          }
          return card;
        }),
      });
    } else {
      this.setState({
        ...this.state,
        score: this.state.score,
        selectedCards: [],
        cards: this.state.cards.map((card) => {
          if (card.pokemonId === firstCardId) {
            return { ...card, clickable: true, flipped: false };
          }
          return card;
        }),
      });
    }

    this.checkGameOver();
  }

  toggleClickable(clickable: boolean) {
    this.setState({
      ...this.state,
      cards: this.state.cards.map((card) => {
        return !card.flipped ? { ...card, clickable } : card;
      }),
    });
  }

  flipCard(card: ICard): void {
    this.addToSelectedCards(card);

    if (this.state.selectedCards.length === 2) {
      this.toggleClickable(false);
      this.checkMatch();
      this.toggleClickable(true);
    } else {
      const cards = this.state.cards.map((c) => {
        if (c.id === card.id) {
          return { ...c, flipped: !c.flipped, clickable: !c.clickable };
        }

        return c;
      });

      this.setState({
        ...this.state,
        cards,
      });
    }
  }

  private shuffle(array: ICard[]): ICard[] {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  static createGame(gameRepo: IGameRepo) {
    return new GameController(gameRepo);
  }
}
