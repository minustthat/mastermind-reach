import {Player} from "../gameComponents/player.ts";
import {generateNumbers} from "../generateNumbers.ts";
import SinglePlayerGame from "./singlePlayerGame.ts";

export class GameBuilder {
    player: Player;
    difficultyLevel: string;
    hintsEnabled: boolean;
    hints: string[];
    constructor() {
        this.player = new Player('');
        this.difficultyLevel = 'easy';
        this.hintsEnabled = false;
        this.hints = [];
    }


    withPlayer(playerName: Player) {
        this.player = playerName;
        return this;
    }

    withDifficulty(gameDifficulty: string) {
        this.difficultyLevel = gameDifficulty;
        return this;
    }


    withHintsEnabled(option: boolean) {
        this.hintsEnabled = option;
        return this;
    }

    withHints(gameHints: string[]) {
        this.hints = gameHints;
        return this;
    }

    build(): SinglePlayerGame {
        return new SinglePlayerGame(
            this.player,
            this.difficultyLevel,
            this.hintsEnabled,
            this.hints,
        );
    }
}
