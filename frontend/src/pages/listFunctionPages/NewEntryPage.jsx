import { useState, useEffect } from 'react';
import GlobalAnimeReferencePage from './InnerPages/GlobalAnimeReferencePage.jsx';
import AnimeForm from '../AnimeForm.jsx';

export default function NewEntryPage({ token, toggleNewEntryOff }) {
    const [error, setError] = useState(null);

    const handleSubmit = async (entryInformation) => {

        try {
            const postRes = await fetch(`http://localhost:7777/anime_list/create_entry/${entryInformation.animeId}`, { //animeId should go into req.params
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    animeInfo: entryInformation
                })
            });

            const data = await postRes.json();

            if (postRes.ok) {
                toggleNewEntryOff(false);
            } else {
                //console.log(data.message); //testing
                setError((new Error(data.message)).message);
            }

        } catch (error) {
            console.error("Error posting entry in to Table:UserAnimeList:", error);
            setError(error.message);
        }
    };

    return (
        <>  {/* form for creating a new anime entry */}
            <AnimeForm submissionFunction = {handleSubmit} formTitle = "Create New Anime Entry" />
            {/* print error message if entry submission is invalid */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* go back to home page*/}
            <button onClick={() => toggleNewEntryOff(false)}>Back To Home Page</button>

            <GlobalAnimeReferencePage token={token} />
        </>
    )

}
