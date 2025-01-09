import EventEmitter from "node:events";
export class PlayerEmitter extends EventEmitter{
    constructor(){
        super()
    }
}

export class GameEmitter extends EventEmitter{
    constructor(){
        super()
    }
}
// emit events for these four scenarios to pass information through.