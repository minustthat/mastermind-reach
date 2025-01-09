import SinglePlayerGameConfiguration from "./gameConfiguration.ts";
import {Player} from "../gameComponents/player.ts";

export default class MediumGame extends SinglePlayerGameConfiguration{
    override player: Player
    override difficulty: string = 'medium';
    override hints: string[] = []
    override hintsEnabled: boolean = true
    constructor(player:Player){
        super(player)
        this.player = player
    }
}