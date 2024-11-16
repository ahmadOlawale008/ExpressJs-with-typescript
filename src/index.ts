import { config } from "dotenv";
import express from "express";
import { logger } from "./middleware/logEvents";
import path from "path";
import cors from "cors"
import navbarRouter from "./routes/navbar-app";
import employeesRouter from "./routes/api/employees";
import corsOptions from "./config/corsOptions";

config();
const PORT = process.env.BACKEND_PORT || 3500
const app = express();
app.use(logger);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, '/navbar-app')))
app.use("/", navbarRouter)
app.use("/employees", employeesRouter)
app.all('*', (req, res) => {
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, 'navbar-app', "404.html"));
    }
    if (req.accepts("html")) {
        res.json({ error: "404 Not Found" })
    } else {
        res.type("txt").send("404 Not Found")
    }
})
app.listen(PORT)