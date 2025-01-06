declare module "express-session" {
    interface SessionData {
        isAuth: boolean
    }
}
/* this declaration is needed in order to set the isAuth property on Session to true. Without it, typescript is unable to find this
property.
 */
import express, {NextFunction, Request, Response} from 'express'
import cors from 'cors'
import session from 'express-session'
import {connectToDatabase} from "../database/database.ts";
import SessionClient from "../database/sessionClient.ts";
import {registerPlayer, loginPlayer} from "../gameComponents/player.ts";
// @ts-ignore
import connectMongo from 'connect-mongodb-session'

const app = express()
connectToDatabase().catch(err=> console.log(err))

app.use(cors())
const MongoDBStore = connectMongo(session)
const store = new MongoDBStore(
    {
        uri: 'mongodb+srv://minusthat:nfya5rhr6Guqm07e@sessions.g6hwk.mongodb.net/sessions',
        collection: 'urlsessions'
    }
)
app.use(session({
    secret: 'reach-mastermind',
    resave: false,
    saveUninitialized: false,
    store: store
}))
app.use(express.json());

const sessionClient = new SessionClient()
const generateBody = (obj: Object): {} => {
    let finalObject = {}
    Object.assign(obj,finalObject)
    return finalObject
}
app.get('/register', (req: Request, res: Response): void => {
    res.status(200).set({'Content-Type': 'text/html'}).send(`
        <form action = "/newuser" method="POST"> 
        <label for="username"> Username: </label>
        <input type = "text" id="username" name="username"> 
        
        <label for="email"> Email Address: </label>
        <input type = "email" id="email" name="email"> 
       
        <label for="password"> Password : </label>
        <input type = "password" id="password" name="password" min="7"> 
        <input type="submit">  
        </form>
    `)
})
app.post('/newuser', express.urlencoded({ extended: true }),(req: Request, res: Response): void => {
    try{
        res.status(201)
        req.setTimeout(5000, () => {
            console.log('Request timed out');
            res.status(408).send('Request Timeout');
        });
        const {username,email,password} = req.body
        registerPlayer(username,email,password).catch(err=> console.log(`Err: ${err}`))
        req.session.isAuth = true
        console.log(req.session)
        res.redirect('/register')
    } catch(err: unknown){
        console.log(err)
    }
})

app.get('/login', (req,res) => {
    res.status(200).set({'Content-Type': 'text/html'}).send(`
        <form action = "/newsession" method="POST"> 
        <label for="username"> Username: </label>
        <input type = "text" id="username" name="username"> 
        
        <label for="password"> Password : </label>
        <input type = "text" id="password" name="password"> 
        <input type="submit">  
        </form>
    `)
})
app.post('/newsession', express.urlencoded({ extended: true }),  async (req: Request, res: Response) => {
    try{
        const {username,password} = req.body
        const accessGranted = await loginPlayer(username,password)
        if(!accessGranted){
            res.redirect('/login')
        }
        else {
            req.session.isAuth = true
        }
    }
    catch(err){
        console.log(`err:${err}`)
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