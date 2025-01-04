import Game from "./game.ts";
import {Player} from "../gameComponents/player.ts";
import {SinglePlayerGameBuilder} from "./singlePlayerGameBuilder.ts";

export default class SinglePlayerGame implements Game{
    player: Player;
    date: string = Date.now().toString()
    difficultyLevel: string;
    hintsEnabled: boolean;
    hints: string[];

    constructor(player: Player,difficultyLevel: string, hintsEnabled: boolean, hints: string[]){
        this.player = player
        this.difficultyLevel = difficultyLevel
        this.hintsEnabled = hintsEnabled
        this.hints = hints

    }
}