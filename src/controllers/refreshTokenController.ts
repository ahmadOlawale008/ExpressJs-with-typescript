import { UsersType } from "types"
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User from "../model/User";

const userDb: UsersType = {
    users: require("../model/users.json"), setUsers: function (data) { this.users = data }
}

export const refreshTokenController = async (req: Request, res: Response) => {
    const cookie = req.cookies
    if (!cookie?.jwt) {
        res.sendStatus(401)
        return
    }
    const refreshToken = cookie.jwt as string
    const foundUser = await User.findOne({refreshToken}).exec()
    if (!foundUser) {
        res.status(401).send({ "msg": "User not found", "success": false })
        return
    }
    const roles = Object.values(foundUser.roles instanceof Object)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err, decoded) => {
        if (err || typeof (decoded) != "object" || !decoded.hasOwnProperty("username")) {
            res.status(403).send({ "msg": "Invalid refresh token", "success": false })
            return
        }
        const accessToken = jwt.sign({
            "UserInfo": {
                username: foundUser.username,
                roles
            }
        }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "5m" })
        res.json({ accessToken, "success": true })
    })
}