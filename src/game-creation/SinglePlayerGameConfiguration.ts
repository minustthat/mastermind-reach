import Player from "../game-components/player.ts";

import {Game} from "./game.ts";
import EventEmitter from "node:events";
import {generateNumbers} from "../game-components/generateNumbers.ts";

export default class SinglePlayerGameConfiguration extends EventEmitter implements Game {
    player: Player
    date: string = Date.now().toString()
    hints: string[] = []
    hintsEnabled: boolean = true
    result: string = ''
    difficulty: string = ''
    guesses: string[] = []
    constructor(player: Player) {
        super()
        this.player = player
    }

    generateResult(): object {
        return {
            player: this.player.username,
            date: this.date,
            hintsEnabled: this.hintsEnabled,
            difficulty: this.difficulty,
            result: this.result
        }
        // returns an object of the game so I can store results to a database.
    }

    generateTargetNumber = async () => {
        const apiCall = generateNumbers(this.difficulty)
        // calls the api
        const randomNumber = await apiCall ?? ''
        // awaits the result, to return a definite answer
        const randomNumberArray: string[] = Array.from(randomNumber)
        // makes an array for the returned result, and returns an empty array to avoid null exceptions
        return randomNumberArray.filter(item => item !== '\n')
    }
    // generates target number and removes white spaces from them, returning an array of the clean version for iteration.

    startGame = (): (num: string) => Promise<string | undefined> => {
        let attemptCount: number = 0
        // keeps track of the number of tries, if this number exceeds 10 then the game is over and the user has lost.
        let targetNumber: Promise<string[] | undefined> = this.generateTargetNumber()
        // returns the result of the api call to a variable
        let guess = async (num: string): Promise<string | undefined> => {
            let feedback = ''
            this.guesses.push(num)
            // must be returned, so I left it out of the scope of the try catch block.
            try {
                attemptCount++
                // increment attempt counter
                let guessArray: string[] = Array.from(num)
                let targetArray: string[] = await targetNumber ?? ['']
                if (guessArray === targetArray) {
                    this.result = 'won'
                    this.emit('win')
                    // just create an event for this, and when when is done send a message to the browser and save to db.
                }
                feedback = this.findNumberAndLocation(targetArray, guessArray)
                console.log(targetArray)
                console.log(attemptCount)
                if (attemptCount > 10) {
                    this.result = 'loss'
                    this.emit('loss')
                }
                // the number of matches
            } catch (err) {
                console.log(`Err: ${err}`)
            }
            return `${feedback}`
        }
        return guess
    }

    findNumberAndLocation(objective: string[], guess: string[]) {
        let locationCounter: number = 0
        for (let i = 0; i < objective.length; i++) {
            // @ts-ignore
            if (objective[i] == guess[i]) {
                locationCounter++
            }
        } // location
        let numberCounter: number = 0
        const noDuplicates: Set<string> = new Set<string>(objective)
        noDuplicates.forEach(i => {
            if (guess.includes(i)) {
                numberCounter += 1
            }
        })
        return `${numberCounter} correct numbers, ${locationCounter} correct locations.`
    }
}