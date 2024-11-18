import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const veryifyJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log("No authorization headerrr", req.headers);
    if (!authHeader) {
        res.sendStatus(401)
        return
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err, decoded) => {
        console.log(decoded, token, "Decoded")
        if (err || typeof (decoded) != "object" || !decoded.hasOwnProperty("username")) {
            res.sendStatus(403)
            return
        }
        req.user = decoded.username
        next()
    })
}