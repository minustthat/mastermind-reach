import Player from "../game-components/player.ts";
import {gameFactory} from "../game-creation/gameFactory.ts";
import SinglePlayerGameConfiguration from "../game-creation/SinglePlayerGameConfiguration.ts";
const player1: Player = {
    username: 'test-user',
    email: 'testing@universe.org',
    password: 'password',
    dateRegistered: Date.now().toString()
}
// mock user
const easygame: SinglePlayerGameConfiguration = gameFactory(player1, 'easy')
let gameTest = easygame.startGame()


gameTest('1234').then(message => console.log(message))
gameTest('1234').then(message => console.log(message))
gameTest('1234').then(message => console.log(message))
gameTest('1234').then(message => console.log(message))
gameTest('1234').then(message => console.log(message))
gameTest('1234').then(message => console.log(message))
gameTest('1234').then(message => console.log(message))
gameTest('1234').then(message => console.log(message))
gameTest('1234').then(message => console.log(message))
gameTest('1234').then(message => console.log(message))



easygame.on('loss',() => {
    console.log('Guess count is over!')
    console.log(easygame.generateResult())

})


console.log(easygame.guesses)