
import {Player} from "../gameComponents/player.ts";
import {Game} from "./game.ts";
import EventEmitter from "node:events";

export default class SinglePlayerGameConfiguration extends EventEmitter implements Game {
    player: Player
    date: string = Date.now().toString()
    hints: string[] = []
    hintsEnabled: boolean = true
    guessCount: number = 0
    result: string = ''
    difficulty: string = ''

    constructor(player: Player){
        super()
        this.player = player
    }

    async guess(guess: string, objective: Promise<string>): Promise<string>{
        let message = ''
        let feedback: string | null = ''
        const objAsArray = Array.from( await objective)
        // array from objective so I can filter through it. If I were to do this with strings, they would have to be in the same order.
        const guessAsArray = Array.from(guess)
        // array from the guess entered, so I can compare the guess array to the objective array.
        let filteredArray = objAsArray.filter(i => {
            return guessAsArray.includes(i)
        })
        // the number of matches
        if(filteredArray.length == guessAsArray.length){
            message = 'You win!'
            feedback = `You have ${objAsArray.length} numbers correct!`
            // if the length of the filtered array is the same as the length of the guess array, then they are a perfect match: which leads to a victory!
        }
        this.guessCount += 1
        feedback = `You have ${filteredArray.length} numbers correct!`
        // if they are not the same length, then increment the guesscount by one, and tell the user how many numbers they guessed correctly.

        if (this.guessCount > 10) {
            message = 'Try again?'
            this.result = 'loss'
            this.generateResult()
        }
        // we need to find a way to keep track of the guessCount, so we can log a loss once it gets to that point. How???
        console.log(objAsArray)
        console.log(guessAsArray)
        console.log(filteredArray)
        // if the guess count exceeds 10, the game is a loss.
        return `${message} ${feedback}`
    }

    generateResult(): object {
        return {
            player: this.player.username,
            date: this.date,
            hintsEnabled: this.hintsEnabled,
            difficulty: this.difficulty,
            result: this.result
        }
    }



}
