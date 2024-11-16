import http, { ServerResponse } from "http"
import path from "path"
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import { EventEmitter } from "stream";
import { config } from "dotenv";

config();
const PORT = process.env.BACKEND_PORT || 3500
const myEmitter = new EventEmitter();

const serveFile = async (filePath:string, contentType:string, response: ServerResponse)=>{
    try {
        const data = await fsPromises.readFile(filePath, "utf8")
        response.writeHead(200, {"content-type": contentType})
        response.end(data)
    } catch (error) {
        response.statusCode = 500;
        response.end()
        console.error(error)
    }
}
const server = http.createServer((req, res) => {
    let urlPath;
    const extension = path.extname(req.url ?? "")
    let contentType;
    switch(extension){
        case ".css":
            contentType = "text/css";
            break;
        case ".js": 
            contentType = "text/javascript";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".txt":
            contentType = "text/plain";
            break;
        default:
            contentType = "text/html";
            break;        
    }
    let filePath = 
    contentType === "text/html" && req.url === "/" ? path.join(__dirname, "navbar-app", "index.html")
    : contentType === "text/html" && req.url?.slice(-1) === "/" ? path.join(__dirname, "navbar-app", req.url, "index.html") :
    contentType === "text/html" ? path.join(__dirname, "navbar-app", req.url as string) : path.join(__dirname, req.url as string)

    if(!extension && req.url?.slice(-1) !== "/") filePath += ".html"
    const fileExists = fs.existsSync(filePath)
    if(fileExists) {
        serveFile(filePath, contentType, res)
    }else{
        switch(path.parse(filePath).base){
            case "sample.html":
                res.writeHead(301, {"Location": "/index.html"})
                res.end()
                break;
            case "www-page.html":
                res.writeHead(301, {"Location": "/"})
                res.end()
                break;
            default:
                serveFile(path.join(__dirname, "navbar-app", "404.html"), 'text/html ', res)
        }
    }
})

server.listen(PORT, ()=>console.log("Server listening on port:  " + PORT))