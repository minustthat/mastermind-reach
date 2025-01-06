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

    validateUser = async(username: string, pwd: string): Promise<boolean> => {
        let exists: boolean = false
        try{
            const user = await userCollection.findOne({username: username})
            if(user == null){
                console.log('user does not exist.')
                exists = false
            }
            // @ts-ignore
            const password = await bcrypt.compare(pwd,user.password)
            if(!password){
                console.log('incorrect password.')
                exists = false
            }

            if(password){
                exists = true
            }
            //compare the hash of the stored version, and current version.
                // @ts-ignore
        }
        catch(err){
            console.log(`Incorrect information: ${err}`)
            return false
        }
        console.log(`name: ${username} password: ${pwd}`)
        console.log(exists)
        return exists
    }
    // if all goes well here, send the cookie.

    checkForExistingUser = async (name: string, emailAddress: string) => {
        try {
            const usernameExists = await userCollection.findOne({username: name})
            if (usernameExists != null) {
                console.log('username exists already')
                return
            }
            const emailExists = await userCollection.findOne({email: emailAddress})
            if (emailExists != null) {
                console.log('email exists already.')
                return
            }
        }
        catch(err){
            return err
        }
        return {name, emailAddress}
    }
}
