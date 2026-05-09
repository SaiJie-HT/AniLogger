import { useState } from 'react';

export default function AnimeForm({ submissionFunction, formTitle, availableId }) {
    // If entryInformation is provided (like when editing), use it for the initial state. Otherwise, default to empty.
    const [animeId, setAnimeId] = useState("");
    const [watchStat, setWatchStat] = useState("");
    const [rate, setRate] = useState(0);
    const [seasWatch, setSeasWatch] = useState(0);
    const [wStartDate, setWStartDate] = useState("");
    const [wEndDate, setWEndDate] = useState("");
    const [interests, setInterests] = useState(false);
    const [comments, setComments] = useState("");

    const handleLocalSubmit = (e) => {
        //prevent form submission from refreshing the page 
        e.preventDefault();

        const entryInformation = {
            animeId: availableId || animeId,
            watchStatus: watchStat,
            rating: rate,
            seasonsWatched: seasWatch,
            watchStartDate: wStartDate,
            watchEndDate: wEndDate,
            derivativeInterests: interests,
            comments: comments
        }

        submissionFunction(entryInformation);
    };

    return (
        <> {/* form to for editing anime entry */}
            <form onSubmit={handleLocalSubmit}>

                <header>{formTitle}</header>
                {/* Only show the Anime ID input if an ID is NOT already provided */}
                {!availableId && <label>
                    Anime Id:
                    <input
                        type="number"
                        placeholder="Anime Id"
                        onChange={(e) => setAnimeId(e.target.value)}
                        required
                    />
                </label>}

                <div>
                    Watch Status:
                    <select onChange={(e) => setWatchStat(e.target.value)} required={!availableId}>
                        <option value="">Choose Status</option>
                        <option value="N/A">N/A</option>
                        <option value="Currently Watching">Currently Watching</option>
                        <option value="Completed Series">Completed Series</option>
                        <option value="Waiting For Next Season">Waiting For Next Season</option>
                        <option value="Unknown">Unknown</option>
                        <option value="Dropped">Dropped</option>
                    </select>
                    Score/Rating ?/10:
                    <select onChange={(e) => setRate(Number(e.target.value))} required={!availableId}>
                        <option value="">Choose Score</option>
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
                        required={!availableId}
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
                        onChange={(e) => setInterests(e.target.checked)}
                    />
                    Brief comments:
                    <input
                        type="text"
                        placeholder="Comments"
                        onChange={(e) => setComments(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>

            </form>

        </>
    )
}
