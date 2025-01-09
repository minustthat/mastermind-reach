import bcrypt from "bcrypt"
import SessionClient from "../database/sessionClient.ts";
export interface Player{
    username: string;
    email: string;
    password: string;
    dateRegistered: string;
}

export const registerPlayer = async (name: string, emailAddress: string, pwd: string) => {
    const client: SessionClient = new SessionClient()
    let player:Player = {
        username: '',
        email: '',
        password: '',
        dateRegistered: Date.now().toString()
    }
    try{
        const check = await client.checkForExistingUser(name, emailAddress)
        if(!check){
            return
        }
        const salt: string =  bcrypt.genSaltSync(10)
        const hashedPassword: string = await bcrypt.hash(pwd,salt)
        player = {
            username: name,
            email: emailAddress,
            password: hashedPassword,
            dateRegistered: Date.now().toString()
        }
    }
    catch(err){
        console.log(`Error registering: ${err}`)
    }
    await client.addUserToDb(player).catch(err=> console.log(`Error: ${err}`))
}

export const loginPlayer = async (name: string, password: string)=> {
         const client = new SessionClient()

    try{
        const isValid: object  = await client.validateUser(name,password)
        if(Object.keys(isValid).length == 0) {
            return false
        }

    }
      catch(err){
             console.log('login player method error.')
      }
      return true
 }


// encode password
// send encoded version to db
// use async version of hash function to avoid blocking the event loop.
// if validate user goes well, I can send the cookie inside of this method.
