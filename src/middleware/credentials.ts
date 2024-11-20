import { whiteList } from "../config/corsOptions";
import { NextFunction, Request, Response } from "express";

export const credentials = (req: Request, res: Response, next: NextFunction)=>{
    const origin = req.headers.origin || ""
    if(whiteList.includes(origin)){
        res.set({
            'Access-Control-Allow-Credentials': true
        })
    }
    next()
}