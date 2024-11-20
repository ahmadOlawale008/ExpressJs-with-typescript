import { CorsOptions } from "cors"

export const whiteList = ["https://www.google.com", "http://localhost:5000", "http://127.0.0.1:5501"]
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin || "") !== -1 || !origin) {
            callback(null, true)
        }
        else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionsSuccessStatus: 200
}
export default corsOptions