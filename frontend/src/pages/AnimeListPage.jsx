import { useState, useEffect } from 'react';


function AnimeListPage({ token, toggleUpdate, handleUpdatePress, refreshTrigger, triggerRefresh }) {
    const [animeList, setAnimeList] = useState([]);
    const [error, setError] = useState(null);
 
    //selective re-rendering of state
    useEffect(() => {

        //function to fetch anime list data
        const fetchAnimeList = async () => {
            try {
                //http GET request
                const fetchRes = await fetch(`http://localhost:7777/anime_list/get_list`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`

                    }
                });

                //get Json from backend
                const listData = await fetchRes.json();

                //if the fetch response is a negative staus code throw new error object with message
                if (!fetchRes.ok) {
                    console.log(listData.message);
                    throw new Error(listData.message);
                }

                //save the array of records of anime entries to animeList 
                setAnimeList(listData.data);

            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message); //any errors thrown will be printed to console and shown on page
            }
        };

        //run for the first time and every time token updates
        fetchAnimeList();

    }, [token, refreshTrigger]); //only re-render state when token is changed or refresh is triggered

    const removeFromEntry = async (idToDelete) => {
        try {
            const deleteRes = await fetch(`http://localhost:7777/anime_list/delete_entry/${idToDelete}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await deleteRes.json();

            console.log(data.deletedEntry);
            if (triggerRefresh) triggerRefresh();

            if (!deleteRes.ok) {
                console.log(deleteRes.message);
                throw new Error(deleteRes.message);
            }

        } catch (error) {
            console.error("Error removing entry:", error);
            setError(error.message);
        }

    }


    return (
        <>
            <table>
                {/* Head of the table */}
                <thead>
                    <tr>
                        <th class ="entry-name"> Anime Name </th>
                        <th> Watch Status </th>
                        <th> Rating </th>
                        <th> Seasons Watched </th>
                        <th> Watch Start Date </th>
                        <th> Watch End Date </th>
                        <th> Interests In Other Adaptations? </th>
                        <th> Comments </th>
                        <th class ="entry-actions"> Entry Actions </th>
                    </tr>
                </thead>

                { /* Body of the table */}
                <tbody>

                    {/** JXS is able to handle an array of fragments returned by map() */}
                    {animeList.map((record) => (
                        //key so react can keep track of list efficiently
                        <tr class = "entry_data" key={record.animeId}>
                            <td>{record.Anime.animeName}</td>
                            <td>{record.watchStatus}</td>
                            <td>{record.rating}</td>
                            <td>{record.seasonsWatched}</td>
                            <td>{record.watchStartDate === null ? "Unknown Start Date" : record.watchStartDate}</td>
                            <td>{record.watchEndDate === null ? "Unknown End Date" : record.watchEndDate}</td>
                            <td>{record.derivativeInterests ? "Yes" : "No"}</td>
                            <td>{record.comments === null ? "No Comments" : record.comments}</td>
                            <td class = "entry-actions">
                                {/*to Modify anime entry and refresh the page */}
                                <button class = "update-button" onClick={() => { 
                                    toggleUpdate(true); 
                                    handleUpdatePress(record); 
                                    }}>Edit</button>
                                {/*to remove anime entry and refresh the page */}
                                <button class = "delete-button" onClick={() => removeFromEntry(record.animeId)}>Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}

export default AnimeListPage;
