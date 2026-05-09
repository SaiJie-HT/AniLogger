import { Router } from 'express';
import supabase from '../databases/supabaseAniLog.js'
import requireAuth from '../middleware/requireAuth.js';
import getGlobalAnimeData from '../middleware/getGlobalAnimeData.js';

const router = Router();

// POST: /listdata/animelist 
// create new anime entry in the database for the user
router.post("/create_entry/:animeId", requireAuth, async (req, res) => {
    const { animeId } = req.params
    const { animeInfo } = req.body;
    const userId = req.user.id; //user is in request after requrieAuth middleware runs

    //deconstruct anime entry information
    const { watchStatus, rating, seasonsWatched, watchStartDate, watchEndDate, derivativeInterests, comments} = animeInfo;

    if (watchEndDate < watchStartDate && watchStartDate && watchEndDate) return res.status(400).json({message: "Watch Start/End Date Invalid"}); //400 Bag Request

    //insert new anime entry information
    //creates a new entry in the UserAnimeList Table
    const { error: listError } = await supabase
        .from("UserAnimeList")
        .insert({
            animeId,
            userId: userId,
            watchStatus,
            rating,
            seasonsWatched,
            watchStartDate: watchStartDate || null,
            watchEndDate: watchEndDate || null,
            derivativeInterests,
            comments: comments || null,
        });


    if (listError) return res.status(500).json({ message: listError.message }); //500 Internal Server Error

    res.status(201).json({ message: "Anime entry added successfully" }); //201 Created
});

router.get("/get_list", requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { data, error } = await supabase
                                   .from("UserAnimeList")
                                   .select("*, Anime(animeName)") //select from all columns of UserAnimeList and animeName from Anime
                                   .eq("userId", userId);

    if (error) return res.status(500).json({ message: error.message }); //500 Internal Server Error

    return res.status(200).json({ message: "Here is your anime list", data: data }); //returns the array of anime entrys of the user
});








//router.post("/create_global_anime/:aniName", requireAuth, getGlobalAnimeData, async (req, res) => {
//    const { globalAniData } = req;
//
//    const listOfNames = globalAniData.map((x) => x.animeName); //saves an array of all names on global anime list
//    //console.log(listOfNames); //testing
//
//    if (listOfNames.includes(req.params.aniName)) return res.status(400).json({ message: "Invalid Submission: Anime already exists in global list"}); //4k00 Bad Request
//
//    const { error } = await supabase
//        .from("Anime")
//        .insert({
//            animeName: req.params.aniName
//        }); //this insertion should auto increment the animeId primary key
//
//        if (error) return res.status(500).json({ message: error.message });
//    
//    return res.status(200).json({ message: "Successfully added new anime to global anime list"});
//});
//
//
//router.get("/get_global_anime_list", requireAuth, getGlobalAnimeData, async (req, res) => {
//    const { globalAniData } = req;
//
//    return res.status(200).json({ message: "Global anime list data", data: globalAniData});
//});









router.put("/update_list/:animeId", requireAuth, async (req, res) => {
    const { animeId } = req.params;
    const { toUpdateInEntry } = req.body;
    const userId = req.user.id;

    //checks if toUpdateEntry Json is undefined or if there is nothing to update
    //Object.keys() returns array of all the keys in the Json object of toUpdateInEntry
    if (!toUpdateInEntry || Object.keys(toUpdateInEntry).length === 0) {
        return res.status(400).json({ message: "No fields to update" }); //400 Bad Request
    }

    const { error } = await supabase
                             .from("UserAnimeList")
                             .update(toUpdateInEntry) //updates all fields of Json obj that matches | undefined are not updated
                             .eq("userId", userId)
                             .eq("animeId", animeId);
    if (error) return res.status(500).json({ message: error.message }); //500 Internal Server Error

    return res.status(200).json({ message: "Anime entry updated"}); //200 Ok

});

router.delete("/delete_entry/:animeId", requireAuth, async (req, res) => {
    const { animeId } = req.params;
    const userId = req.user.id;

    console.log(animeId, typeof animeId)
    console.log(userId, typeof userId);

    const { data, error } = await supabase
                                   .from("UserAnimeList")
                                   .delete()
                                   .eq("userId", userId)
                                   .eq("animeId", animeId)
                                   .select();

    if (error) return res.status(500).json({ message: error.message }); //500 Internal Server Error

    //data data is an array of Json.
    //since one entry is deleted, there is one element in array. Thus, get the element at index 0
    return res.status(200).json({ message: "Anime entry deleted", deletedEntry: data[0]}); //200 Ok
});

export default router;