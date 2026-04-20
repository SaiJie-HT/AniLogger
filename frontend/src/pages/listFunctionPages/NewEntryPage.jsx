import { useState, useEffect } from 'react';
import GlobalAnimeReferencePage from './InnerPages/GlobalAnimeReferencePage.jsx';

export default function NewEntryPage({ token, toggleNewEntryOff }) {
    const [error, setError] = useState(null);

    const [animeId, setAnimeId] = useState(null);
    const [watchStat, setWatchStat] = useState("");
    const [rate, setRate] = useState(0);
    const [seasWatch, setSeasWatch] = useState(0);
    const [wStartDate, setWStartDate] = useState(null);
    const [wEndDate, setWEndDate] = useState(null);
    const [interests, setInterests] = useState(false);
    const [comments, setComments] = useState(null)

    const handleSubmit = async (e) => {
        //prevent form submission from refreshing the page 
        e.preventDefault();

            const animeInfo = {
                watchStatus: watchStat,
                rating: rate,
                seasonsWatched: seasWatch,
                watchStartDate: wStartDate,
                watchEndDate: wEndDate,
                derivativeInterests: interests,
                comments: comments
            }

        try {
            const postRes = await fetch(`http://localhost:7777/anime_list/create_entry/${animeId}`, { //animeId should go into req.params
                method: "POST",
                headers: { 
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify({
                    animeInfo: animeInfo
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
            <form onSubmit = {handleSubmit}>
                <header>Create New Anime Entry</header>
                <label>
                    Anime Id:
                    <input
                        type="number"
                        placeholder="Anime Id"
                        onChange={(e) => setAnimeId(e.target.value)}
                        required
                    />
                    Watch Status:
                    <select onChange={(e) => setWatchStat(e.target.value)}>
                        <option value="N/A">N/A</option>
                        <option value="Currently Watching">Currently Watching</option>
                        <option value="Completed Series">Completed Series</option>
                        <option value="Waiting For Next Season">Waiting For Next Season</option>
                        <option value="Unknown">Unknown</option>
                        <option value="Dropped">Dropped</option>
                    </select>
                    Score/Rating ?/10:
                    <select onChange={(e) => setRate(Number(e.target.value))}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    Number of Seasons Watched:
                    <input
                        type="number"
                        placeholder="No. of Season Watched"
                        onChange={(e) => setSeasWatch(e.target.value)}
                        required
                    />
                    Begun Watching On:
                    <input
                        type="date"
                        placeholder="Start Date"
                        onChange={(e) => setWStartDate(e.target.value)}
                    />
                    Stopped Watching On:
                    <input
                        type="date"
                        placeholder="End Date"
                        onChange={(e) => setWEndDate(e.target.value)}
                    />
                    Interested in Adaptations? (Manga, Light Novels, etc...)
                    <input
                        type="checkbox"
                        onChange={(e) => setInterests(e.target.value)}
                    />
                    Brief comments:
                    <input
                        type="text"
                        placeholder="Comments"
                        onChange={(e) => setComments(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>

            </form>

            {/* print error message if entry submission is invalid */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* go back to home page*/}
            <button onClick = {() => toggleNewEntryOff(false)}>Back To Home Page</button>

            <GlobalAnimeReferencePage token = {token} />
        </>
    )

}
