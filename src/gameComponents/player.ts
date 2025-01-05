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
    try{
        const salt: string =  bcrypt.genSaltSync(10)
        const hashedPassword: string = await bcrypt.hash(pwd,salt)
        const player: Player = {
            username: name,
            email: emailAddress,
            password: hashedPassword,
            dateRegistered: Date.now().toString()
        }
        await client.addUserToDb(player).catch(err=> console.log(`Error: ${err}`))
        console.log(player)
    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}
 export const loginPlayer = async (name: string, password: string)=> {
         const client = new SessionClient()
         await client.findUser(name,password)
 }

// encode password
// send encoded version to db
// use async version of hash function to avoid blocking the event loop.
const client = new SessionClient()
