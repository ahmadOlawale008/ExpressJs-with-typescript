import { Request, Response } from "express";
import { UsersType } from "types";
import User from "../model/User";

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
    const foundUser = await User.findOne({refreshToken})
    if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true })
        res.sendStatus(204) // indicates the request was successful but no context to return
        return
    }
    if (foundUser.refreshToken) {
        foundUser.refreshToken = ''
        foundUser.save();
    }
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true })
    res.sendStatus(200)
}