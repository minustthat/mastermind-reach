export default interface Player{
    username: string;
    email: string;
    password: string;
    dateRegistered: string;
}
// encode password
// send encoded version to db
// use async version of hash function to avoid blocking the event loop.
// if validate user goes well, I can send the cookie inside of this method.
