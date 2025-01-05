import express, {Request, Response} from 'express'
import cors from 'cors'

import {connectToDatabase} from "../database/database.ts";
import SessionClient from "../database/sessionClient.ts";
import {registerPlayer} from "../gameComponents/player.ts";
import {SinglePlayerGameBuilder} from "../gameModes/singlePlayerGameBuilder.ts";
import SinglePlayerGame from "../gameModes/singlePlayerGame.ts";
import bodyParser from "body-parser";

const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectToDatabase().catch(err=> console.log(err))
const sessionClient = new SessionClient()


const generateBody = (obj: Object): {} => {

    let finalObject = {}
    Object.assign(obj,finalObject)
    return finalObject
}
app.get('/', (req: Request, res: Response): void => {
    res.status(200).set({'Content-Type': 'text/html'}).send(`
        <form action = "/newUser" method="POST"> 
        <label for="username"> Username: </label>
        <input type = "text" id="username" name="username"> 
        
        <label for="email"> Email Address: </label>
        <input type = "text" id="email" name="email"> 
       
        <label for="password"> Password : </label>
        <input type = "password" id="password" name="password"> 
        <input type="submit">  
        </form>
    `)
})
app.post('/newuser', (req: Request, res: Response): void => {
    try{
        req.accepts('text/html')
        res.status(201)
        req.setTimeout(5000, () => {
            console.log('Request timed out');
            res.status(408).send('Request Timeout');
        });
        const name: string = req.body.username
        const email: string = req.body.email
        const password: string = req.body.password
        registerPlayer(name,email,password).catch(err=> console.log(`Err: ${err}`))
        console.log(name)
    } catch(err: unknown){
        console.log(err)
    }
})

// app.get('/newgame', async (req: Request, res: Response) => {
//     res.send(`
//         <form action = "/gameconfig" method="POST">
//         <label for="difficultyLevel"> Username: </label>
//         <input type = "text" id="difficultyLevel" name="difficultyLevel">
//         <input type="submit">
//         </form>
//     `)
// })
// app.post('/gameconfig', async (req: Request, res: Response) => {
//
//     try
//     {
//         req.accepts('text/json')
//         res.status(201)
//         const game: SinglePlayerGame = new SinglePlayerGameBuilder()
//             .withPlayer(new Player(req.body.Player))
//             .withDifficulty(req.body.difficultyLevel)
//             .withHintsEnabled(req.body.difficultyLevel != 'hard')
//             // hints only enabled for hard difficulty games.
//             .withHints(req.body.setHints == true ? ['none'] : ['none'])
//             .build()
//         res.send(game)
//     }
//     catch (err: unknown)
//     {
//         console.log(err)
//     }
// })
app.post('/play', (req: Request, res: Response) => {
})

app.listen(3000, (): void => {
    console.log('server is running.')
})