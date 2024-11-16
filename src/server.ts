import http from "http"
import path from "path"
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import { EventEmitter } from "stream";
import { config } from "dotenv";
config();
const PORT = process.env.BACKEND_PORT || 3500
const myEmitter = new EventEmitter();
const server = http.createServer((req, res) => {
    res.end("HEllo World")
})
server.listen(PORT)