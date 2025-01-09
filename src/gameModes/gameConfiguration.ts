
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
        // returns an object of the game so I can store results to a database.
    }

    generateTargetNumber = async () => {
        const apiCall = generateNumbers(this.difficulty)
        // calls the api
        const randomNumber = await apiCall
        // awaits the result, to return a definite answer
        const randomNumberArray: string[] = randomNumber ? Array.from(randomNumber) : []
        // makes an array for the returned result, and returns an empty array to avoid null exceptions
        return  randomNumberArray.filter(item => item !== '\n');
        // returns the array. Without this filter, the array would have line breaks between each character since the api responds with columns.
    }
    startGame =  () => {
        let attemptCount: number = 0
        // keeps track of the number of tries, if this number exceeds 10 then the game is over and the user has lost.
        let targetNumber = this.generateTargetNumber()
        // returns the result of the api call to a variable
        let guess = async (num: string) => {
                let feedback = ''
            // must be returned, so I left it out of the scope of the try catch block.
                try {
                    attemptCount++
                    // increment attempt counter
                    const guessArray: string[] = Array.from(num)
                    //make array from the user's argument.
                    // @ts-ignore
                    const target = await targetNumber
                    const matchingNumberArray = target.filter(i => guessArray.includes(i))
                    // filter out each number inside of the target array that does not also appear in the guess array
                    if (matchingNumberArray.length == guessArray.length) {
                        this.result = 'won'
                        this.emit('win')
                        return "you win!"
                    }
                    if (attemptCount > 10) {
                        this.emit('loss')
                        return "Game over!"
                    }
                    feedback  = `You have ${matchingNumberArray.length} numbers correct!`
                    // the number of matches
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
// lets make the guess method only execute guesses, and have a different method for calling the api.

