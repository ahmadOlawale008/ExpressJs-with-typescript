import logEvents from "./middleware/logEvents";
import { EventEmitter } from "stream";

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();
console.log("Started MyEmitter");

myEmitter.on("log", (msg) => logEvents(msg))

setTimeout(() => {
    myEmitter.emit("log", "Log Event Emitter")
}, 2000)