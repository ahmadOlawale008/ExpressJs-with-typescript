import { config } from "dotenv";
import express from "express";
import logEvents, { logger } from "./middleware/logEvents";
import path from "path";

config();
const PORT = process.env.BACKEND_PORT || 3500
const app = express();
app.use(logger);
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, '/navbar-app')))
app.get('^/$|index(.html|htm)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'navbar-app', "index.html"));
})
app.get('sample(.html|htm)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'navbar-app', "sample.html"));
})
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'navbar-app', "404.html"));
})
app.listen(PORT)