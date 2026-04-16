import { useState } from 'react'
import './App.css'
import LoginPage from "./pages/loginPage.jsx"


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
      <div>
        <h1>Welcome, {userTokenAndData.user.email}!</h1>

        {/*log out button */}
        <button onClick={() => setUserTokenAndData(null)}>Log Out</button>
      </div>
    </>
  )
}

