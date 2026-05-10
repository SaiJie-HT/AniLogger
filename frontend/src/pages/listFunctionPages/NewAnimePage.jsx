import { useState } from 'react'
import GlobalAnimeReferencePage from "./InnerPages/GlobalAnimeReferencePage.jsx"
import AniLoggerHeaderElement from '../AniLoggerHeaderElement.jsx';

export default function NewAnimePage({ token, toggleNewAnimeOff }) {
    const [error, setError] = useState(null);

    const [nameOfAnime, setNameOfAnime] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent form submission from refreshing page

        if (nameOfAnime === "") return res.status(400).json({ message: "Name Invalid: Please add a name" }); //400 Bag Request

        try {
            const postRes = await fetch(`http://localhost:7777/global_list/create_global_anime/${nameOfAnime}`, { //animeId should go into req.params
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (postRes.ok) {
                toggleNewAnimeOff(false);
            } else {
                setError((new Error(DataTransfer.message)).message);
            }

        } catch (error) {
            console.error("Error posting anime to Table:Anime", error);
            setError(error.message);
        }

    }

    return (
        <>
            <AniLoggerHeaderElement />
            <form class="anime_form" onSubmit={handleSubmit}>
                <header>Add New Global Anime</header>

                <div class="ani_form_divider">
                    Anime Name:
                    <input 
                        class = "global_name_input"
                        type="text"
                        placeholder="name"
                        onChange={(e) => setNameOfAnime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>

            <button onClick={() => toggleNewAnimeOff(false)}>Back To Home Page</button>
            <GlobalAnimeReferencePage token={token} />
        </>
    )
}
