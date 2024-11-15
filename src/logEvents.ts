import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { promises as fsPromises } from 'fs'
import path from "path";
import fs from 'fs';

const logEvents = async (message: string) => {
    const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    try {
        if (!fs.existsSync(path.join(__dirname, "logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "logs"))
        }
        
        await fsPromises.appendFile(path.join(__dirname, "logs", "eventsLog.txt"), logItem)
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export default logEvents