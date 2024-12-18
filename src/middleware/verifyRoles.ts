import { NextFunction, Request, Response } from "express"
const verifyRoles = (...allowedRoles: number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log("Did not run Next Function")
        if (!req.roles) {
             res.status(401).json({ message: "Roles Unauthorized" })
            return
        }
        const result = req.roles.map(role=>allowedRoles.includes(role)).find(val=> val=== true)
        if (!result) {
             res.sendStatus(401)
            return
        }
        next()
    }
}
export default verifyRoles