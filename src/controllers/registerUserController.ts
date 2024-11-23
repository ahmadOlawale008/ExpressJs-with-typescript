import { Request, Response } from "express";
import { encryptPassword } from "../config/encrypt";
import User from "../model/User";

export const handleNewUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: "Missing user or password" })
        return
    }
    const duplicates = await User.findOne({username}).exec()
    if (duplicates) {
        res.sendStatus(409)
        return
    }
    try {
        const hashedPassword = await encryptPassword(password)
        const newUser= await User.create({username, password: hashedPassword})
        res.status(201).json({ msg: "User created successfully", user: newUser })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ msg: error.message })
        }
        res.status(500).json({ msg: "Unknown Error" })
    }
}
