import { useState } from 'react';

function ListFunctionButtons({toggleNewEntryOn, toggleNewAnimeOn}) {
    const [updateOn, toggleUpdateOn] = useState(false);
    const [deleteOn, toggleDeleteOn] = useState(false);
    
    if (updateOn) return <UpdateEntryPage />

    if (deleteOn) return <DeleteEntryPage />


    //add code to handle updating and deleting entries
    //updating and delting entries will appear along with the home menu, so user can refer to table
    //adding new anime to database and creating new entry should change the whole page (so i have a alterEntry function)

    return (
        <>
            <div>
                <button onClick = {() => toggleNewEntryOn(true)}>Create New Entry</button>
                <button onClick = {() => toggleNewAnimeOn(true)}>Add New Anime To Database</button>
                <button onClick = {() => toggleUpdateOn(!updateOn)}>Update Entry Booop</button>
                <button onClick = {() => toggleDeleteOn(!deleteOn)}>Delete Entry</button>
            </div>
        </>
    )
}

export default ListFunctionButtons;