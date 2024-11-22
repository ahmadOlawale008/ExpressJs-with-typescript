import { Request, Response } from "express";
import { UsersType } from "types";
import { promises as fsPromises } from 'fs';
import path from "path";

const userDb: UsersType = {
    users: require("../model/users.json"), setUsers: function (data) { this.users = data }
}

export const handleLogout = async (req: Request, res: Response) => {
    const cookies = req.cookies
    if (req.user || !cookies?.jwt) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }
    const refreshToken = req.cookies.jwt as string
    const foundUser = userDb.users.find(user => user.refreshToken === refreshToken)
    if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true })
        res.sendStatus(204) // indicates the request was successful but no context to return
        return
    }
    const otherUsers = userDb.users.filter(user => user.username !== foundUser.username)
    // Delete refresh Token
    if (foundUser.refreshToken) delete foundUser.refreshToken
    userDb.setUsers([...otherUsers, foundUser])
    await fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(userDb))
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true }) // secure: true = Only serves on https
    res.sendStatus(200)
}