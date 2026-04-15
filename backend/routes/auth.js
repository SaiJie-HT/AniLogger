const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const pool = require("../databases/userdata.js");

router.post("/signup", async (req, res) => {
    const {username, password} = req.body;

    try{
        const userCheck = await pool.query("SELECT username FROM users WHERE username = $1", [username]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({message: "Invalid: Username Already Taken"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);
        res.status(201).json({message: "Signup Successful"});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error in signup url"});
    }
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    try {

        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        res.status(202).json({message: "Login Successful", username: user.username});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error in login url"})
    }
})



//const users = [];
//
//router.post("/signup", (req, res) => {
//    const {username, password} = req.body; //deconstruct signup info from req body
//
//    //check if user already exists
//    if (users.find(u => u.username === username)) {
//        res.status(406).json({message: "Invalid: Username Already Taken"});
//    }
//
//    users.push({username, password}); //push to credential storage
//    res.status(200).json({message: "Signup Successful"}); //send ok response and say successful signup.
//});
//
//router.post("/login", (req, res) => {
//    const {username, password} = req.body;
//
//    //finds and returns user that matches credentials. Otherwise undefined
//    const user = users.find(u => u.username === username && u.password === password);
//
//    //unauthorized status code if invalid credentials
//    if (!user) { 
//        res.status(401).json({message: "Invalid Credentials!"});
//    };
//
//    //res accepted status code
//    //also res with username back to frontend
//    res.status(202).json({message: "Login Successful", username: user.username});
//});

module.exports = router;