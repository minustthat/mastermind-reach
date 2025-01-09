import {Collection, Db, MongoClient, ServerApiVersion} from 'mongodb';
import dotenv from 'dotenv'

dotenv.config()
// @ts-ignore
const DB_URI: string = 'mongodb+srv://minusthat:nfya5rhr6Guqm07e@sessions.g6hwk.mongodb.net/?retryWrites=true&w=majority&appName=sessions'
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
export const database: Db = client.db('mastermind')
export const sessionCollection: Collection = database.collection('sessions')
export const userCollection: Collection = database.collection('users')

export const connectToDatabase = async () => {
    try {
        await client.connect()
        console.log("Connected!")
    } catch (err: unknown) {
        console.error(err)
    }
}
