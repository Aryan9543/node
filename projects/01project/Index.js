const express = require("express");
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const port = 8000;

//connect with mongoose

mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(() => console.log("mongodb is connected"))
.catch((err) => console.log("mongo error",err));

//schema 
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String
    },
    gender: {
        type: String
    }
});

const User = mongoose.model("user", userSchema);

//middleware plugin

app.use(express.urlencoded({extended: false}));

//routes

app.get("/api/users",(req,res) => {
    return res.json(users);
})

//dynamic route

app
   .route("/api/users/:id")
   .patch((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    // Update user data
    users[userIndex] = { ...users[userIndex], ...req.body };

    // Write updated data to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update user" });
        }
        return res.json({ status: "success", updatedUser: users[userIndex] });
    });
    })
    .delete((req, res) => {
     const id = Number(req.params.id);
     const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    // Remove user from the array
    users.splice(userIndex, 1);

    // Write updated data to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete user" });
        }
        return res.json({ status: "success", message: "User deleted" });
    });
    });

app.post("/api/users",(req,res) => {
    const body = req.body;
    
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data) => {
        return res.json({status: "success",id: users.length })
    })
     
})

app.listen(port,() => {
    console.log("server started")
})