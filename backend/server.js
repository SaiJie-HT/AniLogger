
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//import signin routes
const authRoutes =  require("./routes/auth.js");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//route imports:
app.use("/auth", authRoutes); //base path of /auth



////temporary database
//const animeList = [];
//
//app.get("/", (req, res) => {
//    res.send("succesful");
//    console.log("successful");
//})
//
//app.post("/newEntry", (req, res) => {
//    const {entryId, animeName, rating, seasonsWatched, watchStatus, derivativeInterests, comments} = req.body
//
//
//    const animeEntry = {
//        entryId,
//        animeName,
//        rating,
//        seasonsWatched,
//        watchStatus,
//        derivativeInterests: derivativeInterests || null,
//        comments: comments || null
//    }
//
//    animeList.push();
//    res.status(201).json(animeEntry);
//}) 

const PORT = 7777
app.listen(PORT, () => {
    console.log(`Server successfully running on port: ${PORT}`)
})