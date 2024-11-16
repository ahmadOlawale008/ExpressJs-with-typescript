import { CorsOptions } from "cors"

const whitelist = ["https://www.google.com", "http://localhost:5000"]
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin || "") !== -1 || !origin) {
            callback(null, true)
        }
        else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionsSuccessStatus: 200
}
export default corsOptions