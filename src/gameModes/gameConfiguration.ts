
import {Player} from "../gameComponents/player.ts";
import {Game} from "./game.ts";
import EventEmitter from "node:events";
import {generateNumbers} from "../generateNumbers.ts";
import {Memoize} from "typescript-memoize";

export default class SinglePlayerGameConfiguration extends EventEmitter implements Game {
    player: Player
    date: string = Date.now().toString()
    hints: string[] = []
    hintsEnabled: boolean = true
    result: string = ''
    difficulty: string = ''
    guessCount: number = 0
    constructor(player: Player){
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
    }

    generateTargetNumber = async () => {
        const apiCall = generateNumbers(this.difficulty)
        const randomNumber = await apiCall
        const randomNumberArray: string[] = randomNumber ? Array.from(randomNumber) : []
        return  randomNumberArray.filter(item => item !== '\n');
    }
    startGame =  () => {
        let attemptCount: number = 0
        let targetNumber = this.generateTargetNumber()
        let guess = async (num: string) => {
                let feedback = ''
                try {
                    attemptCount++
                    const guessArray: string[] = Array.from(num)
                    // @ts-ignore
                    const matches = await targetNumber
                    const filteredArray = matches.filter(i => guessArray.includes(i))
                    if (filteredArray.length == guessArray.length) {
                        feedback = "you win!"
                        this.result = 'won'
                        this.emit('win')
                        return
                    }
                    if (attemptCount > 10) {
                        feedback = "Game over!"
                        this.emit('loss')
                        return
                    }
                    feedback  = `You have ${filteredArray.length} numbers correct!`
                } catch (err) {
                    console.log(`Err: ${err}`)
                }
            return `${feedback}`
            }
            return guess
        }
    }
        /*
    Goals:
    keep track of guess count
    compare guess to objective
    return feedback
    */

// to keep track of guessCount, I will define it on the outside of the closure.

// lets make the guess method only execute guesses, and have a different method for calling the api.

