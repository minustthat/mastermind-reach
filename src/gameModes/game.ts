import {Difficulty} from "../gameComponents/difficulties.ts";
import {Player} from '../gameComponents/player.ts'
export default interface Game {
    player: Player | Player[]
    // persisted
    date: string
    //captured when game is started
    difficultyLevel: string
    // captured during game registration
    hintsEnabled: boolean
    // based on difficultyLevel, captured during time of registration as well
    hints?: string[]
    // dependent on hintsEnabled
}


