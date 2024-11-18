import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { promises as fsPromises } from 'fs'
import path from "path";
import fs from 'fs';
import { NextFunction, Request, Response } from "express";


const logEvents = async (message: string, filePath?: string) => {
    const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "..", "logs"))
        }

        await fsPromises.appendFile(path.join(__dirname, "..", "logs", filePath || "eventsLog.txt"), logItem)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const logger = (req: Request, res: Response, next: NextFunction) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt")
    console.log(`${req.method}\t${req.path}`)
    next()
}
export default logEvents 