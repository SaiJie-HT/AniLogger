import { useState } from 'react'
import './App.css'
import LoginPage from './pages/loginPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import AnimeListPage from './pages/AnimeListPage.jsx'


function App() {
  
  const [userTokenAndData, setUserTokenAndData] = useState(null);

  if (!userTokenAndData) {
    
    return (
      <>
        <LoginPage loggedInUser={setUserTokenAndData} /> 
      </>
    );
  }

  return (
    <>
      <MenuPage userData = {userTokenAndData.user} setUserStatus = {setUserTokenAndData}>
        <AnimeListPage token = {userTokenAndData.token}/>
      </MenuPage>
    </>
  )
}

export default App;
