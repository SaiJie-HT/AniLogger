import supabase from "../databases/supabaseAniLog.js";

/*
    globalAniData visualization (alphabetical order):

    [
        {
            animeId: 1,
            animeName: one
        },
        {
            animeId: 2,
            animeName: two
        },
        etc...
    ]
*/
const getGlobalAnimeData = async (req, res, next) => {
    const { data, error } = await supabase
                                   .from("Anime")
                                   .select("*")
                                   .order("animeName", { ascending: true });

    if (error) return res.status(500).json({ message: error.message }); //500 Internal Server Error

    req.globalAniData = data;

    next();
}

export default getGlobalAnimeData;