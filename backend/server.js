import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

//to pull data from dotenv file
dotenv.config();

//import Authetication routes
import authRoutes from './routes/auth.js';
import aniListRoutes from './routes/aniList.js'

const app = express();

//port to host backend on
const PORT = process.env.PORT || 7778 

//Middleware
app.use(morgan("dev")); //logger on dev script
app.use(cors()); //communication on different ports
app.use(express.json()); //read in json objects
app.use(express.urlencoded({extended: true})) //read in urlencoded strings

//Use routes
//  /auth/ routes
app.use("/auth", authRoutes); //Login and Signup Routes

// /listdata/ routes
app.use("/listdata", aniListRoutes) //anime list routes for fetching data









app.listen(PORT, () => {
    console.log(`Server successfully running on PORT: ${PORT}`);
});