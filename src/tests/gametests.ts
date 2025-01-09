import {Player} from "../gameComponents/player.ts";
import {gameFactory} from "../gameModes/gameFactory.ts";
import SinglePlayerGameConfiguration from "../gameModes/gameConfiguration.ts";
import {generateNumbers} from "../generateNumbers.ts";

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
    // we need to find a way to keep track of the guessCount, so we can log a loss once it gets to that point. How???
    // if the guess count exceeds 10, the game is a loss.
    game.emit('guess')
    return `${message} ${feedback}`
}
     /*
   Goals:
   keep track of guess count
   compare guess to objective
   return feedback
   */
let guess = () => {
    let attemptCount: number = 0
    let message: string = ''
    let feedback: string = ''
    let win: boolean = false
        let compareNumbers = async (num: string) => {
            attemptCount++
            const obj = generateNumbers('easy')
            const objective = await obj
            const objNumberArray: string[] = objective ? Array.from(objective) : []
            const target = objNumberArray.filter(item => item !== '\n');
            let cache: Map<string, string[]> = new Map<string, string[]>()
            cache.set('lastResult', target)
            try {
                const guessArray: string[] = Array.from(num)
                console.log(guessArray)
                // @ts-ignore

                const matches = target.filter(i => guessArray.includes(i))

                if (matches.length == guessArray.length) {
                    message = "you win!"
                    easygame.result = 'won'
                    easygame.generateResult()
                }
                if(matches.length <= 0){
                    feedback = 'You have zero numbers correct!'
                }
                feedback = `You have ${matches.length} numbers correct!`
                console.log(target)
                console.log(`${message} ${feedback}`)
                console.log(attemptCount)
                if(attemptCount >= 10){
                    message = "you lose!"
                    return
                }
            }
            catch(err){
                console.log(`Err: ${err}`)
            }
            return `${message} ${feedback}`
        }
    return compareNumbers
}

let game = easygame.startGame()






