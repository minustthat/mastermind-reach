import {collection} from "./database.ts";

export default class SessionClient{
    addToDb = async (obj: Object) => {
        try {
            await collection.insertOne(obj)
            return `Object inserted: ${JSON.stringify(obj)}`
        }
        catch(err: unknown){
            return err
        }
    }
}