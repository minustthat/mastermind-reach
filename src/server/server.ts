import {PlayerEmitter} from "../events.ts";

declare module "express-session" {
    interface SessionData {
        isAuth: boolean
    }
}
/* this declaration is needed in order to set the isAuth property on Session to true. Without it, typescript is unable to find this
property.
 */
//<editor-fold desc = "imported packages, database connection, and middleware.">
import express, {Request, Response} from 'express'
import cors from 'cors'
import session from 'express-session'
import {connectToDatabase} from "../database/database.ts";
import {registerPlayer, loginPlayer, Player} from "../game-components/player.ts";
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
//</editor-fold>

//<editor-fold desc = "registration">
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
        res.redirect('/register')
    } catch(err: unknown){
        console.log(err)
    }
})
//</editor-fold>

//<editor-fold desc = "login"
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
    const playerEmitter = new PlayerEmitter()
    playerEmitter.on('login', (player: Player): Player => {
        return player
    })
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
//</editor-fold>

//<editor-fold desc = "game settings and setup">
app.get('/setup', async (req: Request, res: Response) => {
    res.send(`
        <form action = "/config" method="POST">
        <label for="difficultyLevel"> Please Select difficulty </label>
        <label 
        <input type = "radio" id="medium" name="medium" value = "easy">
        <input type = "radio" id="difficultyLevel" name="difficultyLevel" value = "medium">
        <input type = "radio" id="difficultyLevel" name="difficultyLevel" value = "hard">
        <input type="submit">
        </form>
    `)
})
 app.post('/config', async (req: Request, res: Response) => {

 })
//</editor-fold>
// will route to a specific endpoint based on difficulty, and or multiplayer.
//<editor-fold desc = "Begin GamePlay">
app.post('/play', (req: Request, res: Response) => {
})
//</editor-fold>
app.listen(3000, (): void => {
    console.log('server is running.')
})