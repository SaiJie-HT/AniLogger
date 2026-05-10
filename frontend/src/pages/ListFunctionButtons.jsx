import { useState } from 'react';

function ListFunctionButtons({toggleNewEntryOn, toggleNewAnimeOn, children}) {
    
    //add code to handle updating and deleting entries
    //updating and delting entries will appear along with the home menu, so user can refer to table
    //adding new anime to database and creating new entry should change the whole page (so i have a alterEntry function)

    return (
        <>
            <div>
                <button onClick = {() => toggleNewEntryOn(true)}>Create New Entry</button>
                <button onClick = {() => toggleNewAnimeOn(true)}>Add New Anime To Database</button>
                {children}
            </div>

        </>
    )
}

export default ListFunctionButtons;