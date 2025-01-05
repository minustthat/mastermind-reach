import {EventEmitter} from "node:events";

export class Player extends EventEmitter{
    name: string;
    guesses: number[] = []
    won: boolean = false

    constructor(name: string){
        super()
        this.name = name;
    }

    get _name(){
        return this.name
    }
    get _won(){
        return this.won
    }
    get _guesses(){
        return this.guesses
    }
    set _won(result: boolean){
        this.won = result
    }
    set _name(n: string){
        this.name = n
    }

}