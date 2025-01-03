import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import {connectToDatabase} from "../database/database.ts";
import SessionClient from "../database/sessionClient.ts";
import {Player} from "../gameComponents/player.ts";
import {Difficulty} from "../gameComponents/difficulties.ts";
import Game from "../gameComponents/game.ts";
const app = express()
connectToDatabase().catch(err => console.log(err))
const sessionClient = new SessionClient()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const generateBody = (obj: Object) => {
    let finalObject = {}
    Object.assign(obj,finalObject)
    return finalObject
}
app.get('/', (req: Request, res: Response) => {
    res.status(200).set({'Content-Type': 'text/html'}).send(`
        <form action = "/newUser" method="POST"> 
        <label for="name"> Username: </label>
        <input type = "text" id="name" name="name"> 
        <input type="submit">  
        </form>
    `)
})
app.post('/newUser', (req: Request, res: Response) => {
    try{
        req.accepts('text/html')
        const name: string = req.body.name
        const player = new Player(name)
        res.send("first step")
        player.emit('registered', name)

    } catch(err: unknown){
        console.log(err)
    }
})

app.get('/newgame', async (req: Request, res: Response) => {

})
app.post('/newgame', async (req: Request, res: Response) => {
    try
    {
        const difficulty = (difficulty: string) => {
            const diff: Difficulty = difficulty == "easy" ? Difficulty.EASY : difficulty == "medium" ? Difficulty.MEDIUM : difficulty == "hard" ? Difficulty.HARD : Difficulty.EASY
            return diff
        }
        let game = new Game()
        game.setPlayer(new Player(req.body.name))
        game.setDate(Date.now().toString())
        game.setDifficultyLevel(difficulty(req.body.difficultyLevel))
        game.setHintsEnabled(game.getDifficultyLevel() == Difficulty.HARD ? false : true)
        // hints only enabled for hard difficulty games.
        game.setHints(game.getHintsEnabled() == true ? [] : [])
        // @ts-ignore
        game.setObjective(req.body.objective)
        res.send(generateBody(game))
        await sessionClient.addToDb(game)
    }
    catch (err: unknown)
    {
        console.log(err)
    }
})
app.post('/play', (req: Request, res: Response) => {
})

app.listen(3000, () => {
    console.log('server is running.')
})