import { Router } from 'express';
import supabase from '../databases/supabaseAniLog.js';

//create router
const router = Router();

//POST /auth/signup 
//signup page
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    //supabase handles email authentication
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        //if there is an error, send bad request status code and print error message
        //prints error message from supabase's signup error message
        return res.status(400).json({ message: error.message });
    }

    //send created status code and successful message
    res.status(201).json({ message: "Signup successful: Check your email to confirm." })
});

//POST /auth/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    //supabase handles checking the password with the hashed version in its database
    const { data, error } = await supabase.auth.signInWithPassword({email, password});

    //onsole.log(data); //testing
    console.log(data.user); //testing

    if (error) {
        //if error, send unauthorized status code and print error message
        //prints error message from supabase's login error message
        return res.status(401).json({ message: error.message });
    }

    res.status(200).json({
        message: "Login successful",
        //send back a session token of the logged in user
        token: data.session.access_token,
        //an object of user info that supabase has on logged in user
        user: data.user
    });

});

export default router;