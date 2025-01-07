import SinglePlayerGameConfiguration from "./gameConfiguration.ts";
import {Player} from "../gameComponents/player.ts";

class HardGame extends SinglePlayerGameConfiguration{
    override player: Player
    override difficulty: string = 'hard';
    override hints: string[] = []
    override hintsEnabled: boolean = false
    constructor(player:Player){
        super(player)
        this.player = player
    }
}