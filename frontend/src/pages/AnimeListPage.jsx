import { useState, useEffect } from 'react';

function AnimeListPage({token}) {
    const [animeList, setAnimeList] = useState([]);
    const [error, setError] = useState(null);

    //selective re-rendering of state
    useEffect(() => {

        //function to fetch anime list data
        const fetchAnimeList = async () => {
            try {
                //http GET request
                const fetchRes = await fetch(`http://localhost:7777/anime_list/get_list` , {
                    method: "GET",
                    headers: { 
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token}`
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

    }, [token]); //only re-render state when token is changed or first put in

    return (
        <>
            <table>
                {/* Head of the table */}
                <thead>
                    <tr>
                        <th> Anime Name </th>
                        <th> Watch Status </th>
                        <th> Rating </th>
                        <th> Seasons Watched </th>
                        <th> Watch Start Date </th>
                        <th> Watch End Date </th>
                        <th> Interests In Other Adaptations? </th>
                        <th> Comments </th>
                    </tr>
                </thead>

                { /* Body of the table */}
                <tbody>

                    {/** JXS is able to handle an array of fragments returned by map() */}
                    {animeList.map((record) => (
                        //key so react can keep track of list efficiently
                        <tr key = {record.animeId}>
                            <td>{record.Anime.animeName}</td>
                            <td>{record.watchStatus}</td>
                            <td>{record.rating}</td>
                            <td>{record.seasonsWatched}</td>
                            <td>{record.watchStartDate === null ? "Unknown Start Date" : record.watchStartDate}</td>
                            <td>{record.watchEndDate === null ? "Unknown End Date" : record.watchEndDate}</td>
                            <td>{record.derivativeInterests ? "Yes" : "No"}</td>
                            <td>{record.comments === null ? "No Comments" : record.comments}</td>
                        </tr> 
                    ))}

                </tbody>
            </table>
        </>
    )
}

export default AnimeListPage;


