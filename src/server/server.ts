import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import {connectToDatabase} from "../database/database.ts";
import SessionClient from "../database/sessionClient.ts";
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connectToDatabase().catch(err => console.log(err))
const sessionClient = new SessionClient()

app.get('/', (req: Request, res: Response) => {

})
app.post('/newUser', (req: Request, res: Response) => {
})

app.get('/newgame', async (req: Request, res: Response) => {

})
app.post('/newgame', async (req: Request, res: Response) => {})
app.post('/play', (req: Request, res: Response) => {

})


app.listen(3000, () => {
    console.log('server is running.')
})