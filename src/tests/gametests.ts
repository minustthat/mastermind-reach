import EasyGame from '../gameModes/easyGame.ts'
import {Player} from "../gameComponents/player.ts";

const player1: Player = {
    username: 'test-user',
    email: 'testing@universe.org',
    password: 'password',
    dateRegistered: Date.now().toString()
}
// mock user

const easygame = new EasyGame(player1)

let guessTest = (game: EasyGame, guess: string, objective: string): string => {
    let message = ''
    let feedback: string | null = ''
        const objAsArray = Array.from(objective)
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
        game.generateResult()
        // if the length of the filtered array is the same as the length of the guess array, then they are a perfect match: which leads to a victory!
    }
        game.guessCount += 1
        feedback = `You have ${filteredArray.length} numbers correct!`
        // if they are not the same length, then increment the guesscount by one, and tell the user how many numbers they guessed correctly.

        if (game.guessCount > 10) {
            message = 'Try again?'
            game.result = 'loss'
            game.generateResult()
        }
        // we need to find a way to keep track of the guessCount, so we can log a loss once it gets to that point. How???
        // if the guess count exceeds 10, the game is a loss.
    return `${message} ${feedback}`
}
let methodCounter: number = 0
/* for the test of this method, I have to use a string to compare. It would lead to a lot of work to promisify a string just to test the original implementation, so making string
params will suffice for mock data.
*/

easygame.on('guess', () => {
    console.log(guessTest(easygame, '1634','1234'))
    methodCounter += 1;
})
// I need to have a loop to keep running this until someone wins, or they have 10 guesses.
// I have to have context of the guess count in order to increment it from the outside. Something must go on.
/*
 Actually, I can have an event that runs, so that when this function is called, there can be a number that will increment. When this number is at 10, I can release the process
 , log the loss, send the appropriate feedback, and allow for a chance to restart the game.
 */
easygame.emit('guess', () => {
    console.log(methodCounter)
})
console.log(methodCounter)