import Player from "../game-components/player.ts";
import {gameFactory} from "../game-creation/gameFactory.ts";
import SinglePlayerGameConfiguration from "../game-creation/gameConfiguration.ts";
const player1: Player = {
    username: 'test-user',
    email: 'testing@universe.org',
    password: 'password',
    dateRegistered: Date.now().toString()
}
// mock user
const easygame: SinglePlayerGameConfiguration = gameFactory(player1, 'easy')
let gameTest = easygame.startGame()