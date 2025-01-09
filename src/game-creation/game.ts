
import Player from '../game-components/player.ts'
export interface Game {
    player: Player | Player[]
    // persisted
    date: string
    //captured when game is started
    hintsEnabled: boolean
    // based on difficultyLevel, captured during time of registration as well
    hints?: string[]
    // dependent on hintsEnabled
    result: string
    // whether the game was a win or lose
    difficulty: string
    // the difficulty of the game, which will determine how many digits the user
    // guess.
    generateResult(): object
}