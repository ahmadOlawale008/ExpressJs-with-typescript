import { UsersType, UserType } from "types"
import { promises as fsPromises } from 'fs';
import path from "path";
import { Request, Response } from "express";
import { encryptPassword } from "../config/encrypt";

const userDb: UsersType = {
    users: require("../model/users.json"), setUsers: function (data) { this.users = data }
}
export const handleNewUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: "Missing user or password" })
        return
    }
    const duplicates = userDb.users.find(user => user.username === username)
    if (duplicates) {
        res.sendStatus(409)
        return
    }
    try {
        const hashedPassword = await encryptPassword(password)
        const newUser: UserType = { _id: (userDb.users.at(-1)?._id || 0) + 1, roles: { "User": 2001 }, username, password: hashedPassword }
        userDb.setUsers([...userDb.users, newUser])
        await fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(userDb.users))
        res.status(201).json({ msg: "User created successfully", user: newUser })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ msg: error.message })
        }
        res.status(500).json({ msg: "Unknown Error" })
    }
}
