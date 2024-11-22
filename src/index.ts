import { config } from "dotenv";
import express from "express";
import { logger } from "./middleware/logEvents";
import path from "path";
import cors from "cors"
import navbarRouter from "./routes/navbar-app";
import employeesRouter from "./routes/api/employees";
import usersRouter from "./routes/api/users";
import authRouter from "./routes/api/auth";
import logoutRouter from "./routes/api/logout";
import corsOptions from "./config/corsOptions";
import refreshTokenRouter from "./routes/api/refresh";
import cookieParser from "cookie-parser";
import { credentials } from "./middleware/credentials";
import { veryifyJwt } from "./middleware/verifyJwt";

config();
const PORT = process.env.BACKEND_PORT || 3500
const app = express();
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/navbar-app')))
app.use("/", navbarRouter)
app.use("/users", usersRouter)
app.use("/auth", authRouter)
app.use(veryifyJwt)
app.use("/employees", employeesRouter)
app.use("/logout", logoutRouter)
app.use("/refresh", refreshTokenRouter)

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