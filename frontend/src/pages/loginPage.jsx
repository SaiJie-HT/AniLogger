import {useState} from "react";

function LoginPage({onLoginSuccess}) {
  const [isLogin, setIsLogin] = useState(true); //default on login page
  const [user, setUser] = useState(''); //username
  const [pass, setPass] = useState(''); //password
  const [message, setMessage] = useState(''); //message regarding login operations

  //reuse for loging in and signing up an account
  const handleSubmit = async (e) => {
    
    //prevents the browser from refreshing webpage whenever button is pressed
    e.preventDefault();

    //determines the enpoint to go to based on isLogin
    //if true, then go to backend login page
    //if false, then go to backend signup page
    const endpoint = isLogin ? "/login" : "/signup";

    //send fetch post request depending on login and signup
    try {
        //http post request 
        const res = await fetch(`http://localhost:7777/auth${endpoint}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: user, password: pass}), //http request can only read strings in javascript notation, so stringify
        });

        //await for response to come back
        const data = await res.json();

        //send logged in user to app.jsx if user is login and is authenticated (determeined by the ok status code)
        if (res.ok && isLogin) {
            //return app.jsx the user that logged in
            onLoginSuccess(data.username);
        } else {
            //if condition unmet, set message of response
            setMessage(data.message);
        }
    } catch (error) {
        setMessage("Error Connecting to Server.")
    }
  };
  
  return (
    <div>

        <h2>{isLogin ? "login" : "Signup"}</h2>
        
        {/* onSubmit: runs handleSubmit when form is sumbitted */}
        <form onSubmit = {handleSubmit}>
        {/*
          input: enter info into html doc
          placeholder: temporary text in input box for hinting as to be what should be entered
          onChange: what to do after input box is changed
          e.target.value: get value from what was entered into input
        */}
            <input
                type = "text"
                placeholder = "Username"
                onChange = {(e) => setUser(e.target.value)}
                required
            />
            <input
                type = "password"
                placeholder = "Password"
                onChange = {(e) => setPass(e.target.value)}
                required
            />
            <button type = "Submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        {/*Conditional rendering: if there is text in message, then print paragraph of the message. 
            if there is no text: end process.
            acts like boolean checking proceess
        */}
        {message && <p>{message}</p>}

        {/* Button to toggle between signing up and loging in */}
        <button onClick = {() => setIsLogin(!isLogin)}> 
            {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
        </button>

    </div>
  );

}

export default LoginPage;