const express = require("express");
const router = express.Router();

const users = [];

router.post("/signup", (req, res) => {
    const {username, password} = req.body; //deconstruct signup info from req body

    //check if user already exists
    if (users.find(u => u.username === username)) {
        res.status(406).json({message: "Invalid: Username Already Taken"});
    }

    users.push({username, password}); //push to credential storage
    res.status(200).json({message: "Signup Successful"}); //send ok response and say successful signup.
});

router.post("/login", (req, res) => {
    const {username, password} = req.body;

    //finds and returns user that matches credentials. Otherwise undefined
    const user = users.find(u => u.username === username && u.password === password);

    //unauthorized status code if invalid credentials
    if (!user) { 
        res.status(401).json({message: "Invalid Credentials!"});
    };

    //res accepted status code
    //also res with username back to frontend
    res.status(202).json({message: "Login Successful", username: user.username});
});

module.exports = router;