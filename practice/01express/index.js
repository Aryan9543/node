// creating a server using expres

const express = require("express");

const app = express();

app.get("/",(req,res) => {
    res.send("This is Homepage");
})

app.get("/about",(req,res) => {
    res.send(`hello ${req.query.name} this is about section `);
})

app.listen(8000,() => {console.log("server started")})
