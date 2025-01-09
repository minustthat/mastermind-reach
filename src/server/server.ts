import {PlayerEmitter} from "../events.ts";
import SessionClient from '../database/sessionClient.ts'
declare module "express-session" {
    interface SessionData {
        isAuth: boolean
        userId?: ObjectId
        game: SinglePlayerGameConfiguration
    }
}

let checkAuth = (req: Request,res: Response,next: NextFunction) => {
    if(req.session.isAuth){
        return next()
    }
    res.redirect('/login')
}
/* this declaration is needed in order to set the isAuth property on Session to true. Without it, typescript is unable to find this
property.
 */
//<editor-fold desc = "imported packages, database connection, and middleware.">
import express, {NextFunction, Request, Response} from 'express'
import cors from 'cors'
import session from 'express-session'
import {connectToDatabase} from "../database/database.ts";
import Player from "../game-components/player.ts";
// @ts-ignore
import connectMongo from 'connect-mongodb-session'
import {ObjectId} from "mongodb";
import SinglePlayerGameConfiguration from "../game-creation/gameConfiguration.ts";
import {gameFactory} from "../game-creation/gameFactory.ts";
const sessionClient = new SessionClient()
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
//</editor-fold>

//<editor-fold desc = "registration">
app.get('/register', (req: Request, res: Response): void => {
    res.status(200).set({'Content-Type': 'text/html'}).send(`
        <form action = "/register" method="POST"> 
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
app.post('/register', express.urlencoded({ extended: true }),(req: Request, res: Response): void => {
    try{
        res.status(201)
        req.setTimeout(5000, () => {
            console.log('Request timed out');
            res.status(408).send('Request Timeout');
        });
        const {username,email,password} = req.body
        sessionClient.registerPlayer(username,email,password).catch(err=> console.log(`Err: ${err}`))
        res.redirect('/register')
    } catch(err: unknown){
        console.log(err)
    }
})
//</editor-fold>

//<editor-fold desc = "login"
app.get('/login', (req,res) => {
    res.status(200).set({'Content-Type': 'text/html'}).send(`
        <form action = "/login" method="POST"> 
        <label for="username"> Username: </label>
        <input type = "text" id="username" name="username"> 
        
        <label for="password"> Password : </label>
        <input type = "text" id="password" name="password"> 
        <input type="submit">  
        </form>
    `)
})
app.post('/login', express.urlencoded({ extended: true }),  async (req: Request, res: Response) => {
    try{
        const {username,password} = req.body
        const user = await sessionClient.validateUser(username,password)
        if(!user){
            res.redirect('/login')
        }
        req.session.isAuth = true
        req.session.userId = user
        res.redirect('/setup')
        //redirect to manage state
        console.log(req.session.userId)


    }
    catch(err){
        console.log(`err:${err}`)
    }

})
//</editor-fold>

//<editor-fold desc = "game settings and setup">

// set difficulty
app.get('/setup', checkAuth,async (req: Request, res: Response) => {
        res.send(`
        <form action = "/setup" method="POST">
        <label for="difficulty"> Please Select difficulty </label>
       
        <input type = "radio" id="easy" name="difficulty" value = "easy">
        <label for="easy"> easy </label>
        <input type = "radio" id="medium" name="difficulty" value = "medium">
        <label for="medium"> medium </label>
        <input type = "radio" id="hard" name="difficulty" value = "hard">
        <label for="hard"> hard </label>
        <input type="submit">
        </form>
   `)
    })

app.post('/setup', express.urlencoded({ extended: true }),async (req: Request, res: Response) => {
    res.status(200).redirect('/play')
    const user = await sessionClient.returnUserFromId(req.session.userId)
    const newgame: SinglePlayerGameConfiguration = gameFactory(user,req.body.difficulty)
    req.session.game = newgame
    console.log(newgame)

})


//</editor-fold>
// will route to a specific endpoint based on difficulty, and or multiplayer.
//<editor-fold desc = "Begin GamePlay">

// play game
     app.get('/play', express.urlencoded({ extended: true }), (req: Request, res: Response) => {
         res.send(`
                <form action = "/game" method="POST">
                <input type="text" id="attempt" name="attempt" />
                <input type="submit"> 
                </form>
`)
         app.post('/game', express.urlencoded({ extended: true }),async (req, res) => {
             try {
                 const user = await sessionClient.returnUserFromId(req.session.userId)
                 const game: SinglePlayerGameConfiguration  = req.session.game ? req.session.game : gameFactory(user,'easy')

                 console.log(game)
                 const guess = game.startGame()
                 if (guess) {
                     if (guess) {
                         guess(req.body.attempt).then(data => console.log(data))
                     }

                 }
             } catch(err){
                console.log(err)
             }

         })
     })
//</editor-fold>
     app.listen(3000, (): void => {
         console.log('server is running.')
     })
