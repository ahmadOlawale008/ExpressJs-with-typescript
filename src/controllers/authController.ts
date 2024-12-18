import { UsersType } from "types"
import { promises as fsPromises } from 'fs';
import path from "path";
import { Request, Response } from "express";
import { comparePassword, encryptPassword } from '../config/encrypt';
import jwt from "jsonwebtoken"
import User from "../model/User";

const userDb: UsersType = {
    users: require("../model/users.json"), setUsers: function (data) { this.users = data }
}
export const handleLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: "Missing user or password", "success": false })
        return
    }
    const foundUser = await User.findOne({username}).exec()
    if (!foundUser) {
        console.log("User not found")
        res.status(401).json({ "success": false, msg: "Invalid username or password" })
        return
    }
    const match = await comparePassword(password, foundUser.password || "")
    if (match) {
        const roles = Object.values(foundUser?.roles || {})
        const accessToken = jwt.sign({
            "UserInfo": {
                username: foundUser.username,
                roles
            }
        }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '5m', })
        const refreshToken = jwt.sign({
            "username": foundUser.username
        }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '1d' })
        foundUser.refreshToken = refreshToken
        foundUser.save();
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({ "success": true, "msg": `User ${foundUser.username} is logged in`, accessToken })
    }
    else {
        console.log("No password match found")
        res.sendStatus(401)
    }
}