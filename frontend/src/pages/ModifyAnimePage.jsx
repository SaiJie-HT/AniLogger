import { useState } from 'react';
import AnimeForm from './AnimeForm.jsx';


export default function ModifyAnimePage({ token, editToggle, editInfo, triggerRefresh}) {

    const [error, setError] = useState(null);

    const handleSubmit = async (entryInformation) => {

        const editSpecificInfo = {
            watchStatus: entryInformation.watchStatus || editInfo.watchStatus,
            rating: entryInformation.rating || editInfo.rating,
            seasonsWatched: entryInformation.seasonsWatched || editInfo.seasonsWatched,
            watchStartDate: entryInformation.watchStartDate || editInfo.watchStartDate,
            watchEndDate: entryInformation.watchEndDate || editInfo.watchEndDate,
            derivativeInterests: entryInformation.derivativeInterests !== undefined ? entryInformation.derivativeInterests : editInfo.derivativeInterests,
            comments: entryInformation.comments || editInfo.comments
        }

        try {
            const postRes = await fetch(`http://localhost:7777/anime_list/update_list/${editInfo.animeId}`, { //animeId should go into req.params
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    toUpdateInEntry: editSpecificInfo
                })
            });

            const data = await postRes.json();

            if (postRes.ok) {
                editToggle(false);
                //refresh the anime list page after modification
                if (triggerRefresh) triggerRefresh();
            } else {
                //console.log(data.message); //testing
                setError((new Error(data.message)).message);
            }

        } catch (error) {
            console.error("Error updating entry in to Table:UserAnimeList:", error);
            setError(error.message);
        }
    };

    return (
        <>  {/* form for creating a new anime entry */}
            <AnimeForm submissionFunction = {handleSubmit} formTitle = "Update Anime Entry" availableId = {editInfo.animeId} />
            {/* print error message if entry submission is invalid */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* go back to home page*/}
            <button onClick={() => editToggle(false)}> Close Modify Menu </button>

        </>
    )
}