import { useState } from 'react'
import './App.css'
import LoginPage from "./pages/loginPage.jsx"


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  if (loggedInUser) {
    return (
      <div>
        <h1>Welcome, {loggedInUser}!</h1>

        {/*log out button */}
        <button onClick={() => setLoggedInUser(null)}>Log Out</button>
      </div>
    );
  }

  return (
    <LoginPage onLoginSuccess={setLoggedInUser} />
  )
}



//function App() {
//
//  const [loggedInUser, setLoggedInUser] = useState(null);
//  const [usernameInput, setUsernameInput] = useState("");
//  const [passwordInput, setPasswordInput] = useState("");
//
//  const [signUp, setNewAccount] = useState(false);
//  const [newUser, setNewUser] = useState("");
//  const [newPassword, setNewPassword] = useState("");
//
//  //prevents the browser from refreshing webpage whenever button is pressed
//  const handleLogin = async (e) => {
//    e.preventDefault();
//
//    //sending a HTTP POST request to backend
//    const res = await fetch("http://localhost:7777/auth/login", {
//      method: 'POST',
//      headers: { "Content-Type": "application/json" },
//      body: JSON.stringify({ username: usernameInput, password: passwordInput }), //convert JSON object to string since HTTP only understands strings
//    });
//
//    const data = await res.json();
//
//    //if response status is ok, set username to useState. Otherwise send alert message in from response
//    if (res.ok) {
//      setLoggedInUser(data.username);
//    } else {
//      alert(data.message); //browser displays message with message from response
//    }
//
//  };
//
//  const handleSignUp = async (e) => {
//    e.preventDefault();
//
//    //HTTP POST Request for signups
//    const signupRes = await fetch("http://localhost:7777/auth/signup", {
//      method: "POST",
//      headers: { "Content-Type": "application/json" },
//      body: JSON.stringify({ username: newUser, password: newPassword }),
//    });
//
//    const data = await signupRes.json();
//
//    if (!signupRes.ok) { //non ok status code will send alert about invalid signup
//      alert(data.message);
//    } else { //ok status code will send account created alert
//      alert(data.message);
//    }
//
//  };
//
//  //if user is logged in, return home page menu
//  if (loggedInUser) {
//    return (
//      <div>
//        <h1>Welcome, {loggedInUser}!</h1>
//
//        {/*log out button */}
//        <button onClick={() => setLoggedInUser(null)}>Log Out</button>
//      </div>
//    )
//  }
//
//// if signup button is clicked, return create account menu
//if (signUp) {
//  return (
//    <div>
//      <h1>Create New Account</h1>
//
//      <form onSubmit={handleSignUp}>
//        <h2>Signup</h2>
//
//        <input
//          placeholder="new username"
//          onChange={(e) => setNewUser(e.target.value)}
//        ></input>
//        <input
//          type="password"
//          placeholder="new password"
//          onChange={(e) => setNewPassword(e.target.value)}
//        ></input>
//
//        {/* Defines button that sends the form data to server */}
//        <button type="submit">Create Account</button>
//
//      </form>
//      
//      {/*button clicked = return to login page */}
//      <button onClick = {() => setNewAccount(false)}>Back to Login</button>
//    </div>
//  )
//}
//
//
//  return (
//    <>
//      <form onSubmit={handleLogin}>
//        <h2>Please Login</h2>
//
//        {/*
//          input: enter info into html doc
//          placeholder: temporary text in input box for hinting as to be what should be entered
//          onChange: what to do after input box is changed
//          e.target.value: get value from what was entered into input
//        */}
//        <input
//          placeholder="username"
//          onChange={(e) => setUsernameInput(e.target.value)}
//        ></input>
//
//        {/*
//          type: specifies the kind of input control to display (in this case "****" as a replacement for password entering)
//        */}
//        <input
//          type="password"
//          placeholder="password"
//          onChange={(e) => setPasswordInput(e.target.value)}
//        ></input>
//        {/* Defines a button that sends the form data to server */}
//        <button type="submit">Login</button>
//      </form>
//
//      <button onClick = {() => setNewAccount(true)}>New User? Create New Account Here</button>
//
//    </>
//  )
//}

export default App
