import {sessionCollection,userCollection} from "./database.ts";
import {Player} from "../gameComponents/player.ts";
import bcrypt from "bcrypt";

export default class SessionClient{
    addSessionToDb = async (obj: Object) => {
        try {
            await sessionCollection.insertOne(obj)
            return `Object inserted: ${JSON.stringify(obj)}`
        }
        catch(err: unknown){
            return err
        }
    }

    addUserToDb = async (obj: Player) => {
        try{
            await userCollection.insertOne(obj)
            return `Object inserted: ${JSON.stringify(obj)}`
        }
        catch(err){
            console.log(`Error adding User to DB: ${err}`)
        }
    }

    findUser = async(username: string, pwd: string) => {
        try{
            const user = await userCollection.findOne({username: username})
            // @ts-ignore
            const password = await bcrypt.compare(pwd,user.password)
            if(!user || !password){
                console.log('Re-enter information.')
            }
            return user
            //compare the hash of the stored version, and current version.
                // @ts-ignore
        }
        catch(err){
            console.log(`Incorrect information: ${err}`)
        }
    }
}
