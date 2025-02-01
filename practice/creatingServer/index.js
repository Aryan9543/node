const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  // console.log("new req received");
  if(req.url === "/favicon.ico") return res.end();
  const myUrl = url.parse(req.url,true);
  console.log(myUrl);
  const log = `${Date.now()} :${req.url} new request received\n`;
  fs.appendFile("./log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("This is Homepage");
        break;
      case "/about":
        const userName = myUrl.query.user;
        res.end(`Hii this is about page , welcome ${userName}`);
        break;
      default:
        res.end("404 not found");
    }
  });
});

myServer.listen(8000, () => {
  console.log("server started");
});
