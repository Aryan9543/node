const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  // console.log("new req received");
  const log = `${Date.now()} :${req.url} new request received\n`;
  fs.appendFile("./log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("This is Homepage");
        break;
      case "/about":
        res.end("this is about page");
        break;

      default:
        res.end("404 not found");
    }
  });
});

myServer.listen(8000, () => {
  console.log("server started");
});
