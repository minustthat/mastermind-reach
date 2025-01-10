import SinglePlayerGameConfiguration from "../game-creation/SinglePlayerGameConfiguration.ts";
import Player from "../game-components/player.ts";

export default class EasyGame extends SinglePlayerGameConfiguration{
    override player: Player
    override difficulty: string = 'easy';
    override hints: string[] = []
    override hintsEnabled: boolean = true
    constructor(player:Player){
        super(player)
        this.player = player
    }
}