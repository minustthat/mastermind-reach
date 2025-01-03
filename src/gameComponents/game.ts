import {Difficulty} from "./difficulties";
import {Player} from './player'
import {EventEmitter} from "node:events"
export default class Game extends EventEmitter{
    player: Player = new Player('')
    date: string = new Date().getDate().toString();
    difficultyLevel: Difficulty = Difficulty.EASY
    hintsEnabled: boolean = true
    hints: string[] = []
    objective: number = 0
    constructor(){
        super()
    }
    getPlayer(): Player
    {
        return this.player;
    }

    setPlayer(value: Player)
    {
        this.player = value;
    }

    getDate(): string
    {
        return this.date;
    }

    setDate(value: string)
    {
        this.date = value;
    }

    getDifficultyLevel(): Difficulty
    {
        return this.difficultyLevel;
    }

    setDifficultyLevel(value: Difficulty)
    {
        this.difficultyLevel = value;
    }

    getHintsEnabled(): boolean
    {
        return this.hintsEnabled;
    }

    setHintsEnabled(value: boolean)
    {
        this.hintsEnabled = value;
    }

    getHints(): string[]
    {
        return this.hints;
    }

    setHints(value: string[])
    {
        this.hints = value;
    }

    getObjective(): number
    {
        return this.objective;
    }

    setObjective(num: number)
    {
        this.objective = num;
    }
}


