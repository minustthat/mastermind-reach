import SinglePlayerGameConfiguration from "../game-creation/SinglePlayerGameConfiguration.ts";
import Player from "../game-components/player.ts";

export default class HardGame extends SinglePlayerGameConfiguration{
    override player: Player
    override difficulty: string = 'hard';
    override hints: string[] = []
    override hintsEnabled: boolean = false
    constructor(player:Player){
        super(player)
        this.player = player
    }
}