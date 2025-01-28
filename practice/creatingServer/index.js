const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req,res) => {
    console.log("new req received");
    const log = `${Date.now()} : new request received\n`;
    fs.appendFile('./log.txt',log,(err,data) => {
        res.end("again hello from server");
    })
    

})

myServer.listen(8000,() => {console.log("server started")});