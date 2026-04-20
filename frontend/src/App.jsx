import { useState } from 'react'
//import './App.css'
import LoginPage from './pages/loginPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import AnimeListOptionsBar from './pages/ListFunctionButtons.jsx'
import AnimeListPage from './pages/AnimeListPage.jsx'
import ListFunctionButtons from './pages/ListFunctionButtons.jsx';
import NewEntryPage from './pages/listFunctionPages/NewEntryPage.jsx';
import NewAnimePage from './pages/listFunctionPages/NewAnimePage.jsx';



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

  if (newEntry) return <NewEntryPage token = {userTokenAndData.token} toggleNewEntryOff = {toggleNewEntry}/>
  if (newAnime) return <NewAnimePage token = {userTokenAndData.token} toggleNewAnimeOff = {toggleNewAnime}/> 

    //displaying login and signin pages 
  if (!userTokenAndData) return <LoginPage loggedInUser={setUserTokenAndData} /> 


  return (
    <>
      <MenuPage userData = {userTokenAndData.user} setUserStatus = {setUserTokenAndData}>

        <h2>Functions Bar:</h2>
        <ListFunctionButtons toggleNewEntryOn = {toggleNewEntry} toggleNewAnimeOn = {toggleNewAnime} />

        <h3>{userTokenAndData.user.email}'s Anime Catalouge</h3>
        <AnimeListPage token = {userTokenAndData.token}/>
      </MenuPage>
    </>
  )
}

export default App;
