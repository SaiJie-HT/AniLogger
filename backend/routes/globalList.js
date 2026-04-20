import { Router } from 'express';
import supabase from '../databases/supabaseAniLog.js'
import requireAuth from '../middleware/requireAuth.js';
import getGlobalAnimeData from '../middleware/getGlobalAnimeData.js';

const router = Router();

router.post("/create_global_anime/:aniName", requireAuth, getGlobalAnimeData, async (req, res) => {
    const { globalAniData } = req;

    const listOfNames = globalAniData.map((x) => x.animeName); //saves an array of all names on global anime list
    //console.log(listOfNames); //testing

    if (listOfNames.includes(req.params.aniName)) return res.status(400).json({ message: "Invalid Submission: Anime already exists in global list"}); //4k00 Bad Request

    const { error } = await supabase
        .from("Anime")
        .insert({
            animeName: req.params.aniName
        }); //this insertion should auto increment the animeId primary key

        if (error) return res.status(500).json({ message: error.message });
    
    return res.status(200).json({ message: "Successfully added new anime to global anime list"});
});


router.get("/get_global_anime_list", requireAuth, getGlobalAnimeData, async (req, res) => {
    const { globalAniData } = req;

    return res.status(200).json({ message: "Global anime list data", data: globalAniData});
});

export default router;