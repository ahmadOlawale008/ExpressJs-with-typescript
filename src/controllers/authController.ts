import { UsersType } from "types"
import { promises as fsPromises } from 'fs';
import path from "path";
import { Request, Response } from "express";
import { comparePassword, encryptPassword } from '../config/encrypt';
import jwt from "jsonwebtoken"
const userDb: UsersType = {
    users: require("../model/users.json"), setUsers: function (data) { this.users = data }
}
export const handleLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: "Missing user or password" })
        return
    }
    const foundUser = userDb.users.find(person => person.username === username)
    if (!foundUser) {
        res.status(401).json({ error: "Invalid username or password" })
        return
    }
    const match = await comparePassword(password, foundUser.password || "")
    if (match) {
        const accessToken = jwt.sign({
            username: foundUser.username
        }, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '1m'})
        const refreshToken = jwt.sign({
            username: foundUser.username
        }, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: '3d'})
        const otherUsers = userDb.users.filter(user=>user.username != foundUser.username)
        const currentUser = {...foundUser, refreshToken}
        userDb.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(userDb.users) )
        res.json({ "sucess": `User ${foundUser.username} is logged in` })
    }
    else {
        res.sendStatus(401)
    }
}