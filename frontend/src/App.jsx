import { useState } from 'react'
import LoginPage from './pages/loginPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import AnimeListOptionsBar from './pages/ListFunctionButtons.jsx'
import AnimeListPage from './pages/AnimeListPage.jsx'
import ListFunctionButtons from './pages/ListFunctionButtons.jsx';
import NewEntryPage from './pages/listFunctionPages/NewEntryPage.jsx';
import NewAnimePage from './pages/listFunctionPages/NewAnimePage.jsx';
import ModifyAnimePage from './pages/ModifyAnimePage.jsx';

function App() {
  
  /**
   * variable userTokenAndData will store:
   *  A json object:
   *  {
   *    token: [user's access token]
   *    user: [user object with user's data]
   *  }
   * 
   * conditions for this to occur:
   *  1) setUserTokenAndData is passed into <LoginPage>
   *  2) The user logs in
   */
  const [userTokenAndData, setUserTokenAndData] = useState(null);

  const [newEntry, toggleNewEntry] = useState(false);
  const [newAnime, toggleNewAnime] = useState(false);
  const [modifyAnime, toggleModifyAnime] = useState(false);
  const [animeInfoEdit, setAnimeInfoToModify] = useState(null);

  //states for refreshing modifications and deletions of anime entry
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const triggerRefresh = () => setRefreshTrigger(prev => !prev);

  //new pages for creating new entries & adding anime to global list
  if (newEntry) return <NewEntryPage token = {userTokenAndData.token} toggleNewEntryOff = {toggleNewEntry}/>
  if (newAnime) return <NewAnimePage token = {userTokenAndData.token} toggleNewAnimeOff = {toggleNewAnime}/> 

    //displaying login and signin pages 
  if (!userTokenAndData) return <LoginPage loggedInUser={setUserTokenAndData} /> 

  return (
    <div class = "whole">
      <MenuPage userData = {userTokenAndData.user} setUserStatus = {setUserTokenAndData}>

        <h2>Functions Bar:</h2>
        <ListFunctionButtons toggleNewEntryOn = {toggleNewEntry} toggleNewAnimeOn = {toggleNewAnime} />
        <hr />
        {modifyAnime && <ModifyAnimePage 
          token = {userTokenAndData.token} 
          editToggle = {toggleModifyAnime} 
          editInfo = {animeInfoEdit}
          triggerRefresh = {triggerRefresh} /> }

        <h3>{userTokenAndData.user.email}'s Anime Catalouge</h3>
        <AnimeListPage 
          token = {userTokenAndData.token} 
          toggleUpdate = {toggleModifyAnime} 
          handleUpdatePress = {setAnimeInfoToModify}
          refreshTrigger = {refreshTrigger} 
          triggerRefresh = {triggerRefresh}  
        />

      </MenuPage>
    </div>
  )
}

export default App;
