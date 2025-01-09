import {Player} from "../game-components/player.ts";
import {gameFactory} from "../game-creation/gameFactory.ts";
import SinglePlayerGameConfiguration from "../game-creation/gameConfiguration.ts";
import {generateNumbers} from "../game-components/generateNumbers.ts";

const player1: Player = {
    username: 'test-user',
    email: 'testing@universe.org',
    password: 'password',
    dateRegistered: Date.now().toString()
}

// mock user

const easygame: SinglePlayerGameConfiguration = gameFactory(player1, 'easy')
let guessTest = (game: SinglePlayerGameConfiguration, guess: string, objective: string): string => {
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

    feedback = `You have ${filteredArray.length} numbers correct!`
    // if they are not the same length, then increment the guesscount by one, and tell the user how many numbers they guessed correctly.
    if (game.guessCount > 10) {
        message = 'Try again?'
        game.result = 'loss'
        game.generateResult()
    }
    return `${message} ${feedback}`
}

let gameTest = easygame.startGame()



