import { Router } from 'express';
import supabase from '../databases/supabaseAniLog.js'
import requireAuth from '../middleware/requireAuth.js';


const router = Router();

// POST: /listdata/animelist 
// create new anime entry in the database for the user
router.post("/animelist", requireAuth, async (req, res) => {
    const { animeInfo } = req.body;
    const userId = req.user.id; //user is in request after requrieAuth middleware runs

    //deconstruct anime entry information
    const {animeId, watchStatus, rating, seasonsWatched, watchStartDate, watchEndDate, derivativeInterests, comments} = animeInfo;

    //insert new anime entry information
    //supabase handles auto incrementing entryId after inserting new data
    //updates Entry table
    const { data: entryData, error: entryError } = await supabase
        .from("Entry")
        .insert({
            userId: userId,
            watchStatus,
            rating,
            seasonsWatched,
            watchStartDate: watchStartDate || "null",
            watchEndDate: watchEndDate || "null",
            derivativeInterests,
            comments: comments || "null",
        })
        .select() //returns the inserted row
        .single(); //return to entryData the selected single row

    if (entryError) return res.status(500).json({ message: entryError.message });

    //update contains table
    const { error: containsError } = await supabase
        .from("contains")
        .insert({
            animeId: animeId,
            entryId: entryData.entryId //insert entryId returned from previous insert function
        });

    if (containsError) return res.status(304).json({ message: containsError.message });

    res.status(201).json({ message: "Anime added successfully" })
});


router.get("alimelist", requireAuth, async (req, res) => {
    const userId = req.user.id;

    const { data, error } = await supabase
        .from("Entry")
        .select("*")
        .eq("userId", userId)

});
