import { useState, useEffect } from 'react'

export default function GlobalAnimeReferencePage({ token }) {
    const [animeNamesList, setAnimeNamesList] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchAnimeNames = async () => {
            try {
                const fetchRes = await fetch(`http://localhost:7777/global_list/get_global_anime_list`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const responseData = await fetchRes.json();

                if (!fetchRes.ok) {
                    console.log(responseData.message);
                    throw new Error(responseData.message);
                }

                setAnimeNamesList(responseData.data);

            } catch (error) {
                //console.error("Error fetching Table:Anime data:", error); //testing
                setError(error.message);
            }
        };

        fetchAnimeNames();
    }, [token]);

    return (
        <>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* display global anime data to reference for anime id for the new entry form */}
            <table>
                <thead>
                    <tr>
                        {/* Widden the title column to cover two columns  */}
                        <th colSpan={2}> Available Anime Reference (Alphabetical Order)</th>
                    </tr>
                    <tr>
                        <th> Anime Name </th>
                        <th> Anime Reference ID </th>
                    </tr>
                </thead>
                <tbody>
                    {animeNamesList.map((record) => (
                        <tr key={record.animeId}>
                            <td>{record.animeName}</td>
                            <td>{record.animeId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}