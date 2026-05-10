import {useState} from "react";

function LoginPage({loggedInUser}) {
  const [isLogin, setIsLogin] = useState(true); //Default page is login page
  const [email, setEmail] = useState(''); //email
  const [password, setPassword] = useState(''); //password
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
            body: JSON.stringify({email: email, password: password}), //http request can only read strings in javascript notation, so stringify
        });

        //await for response to come back
        const data = await res.json();

        //console.log(data.token); //testing
        //console.log(data.user); //testing

        //response status is codes 200-209 and is on login page
        if (res.ok && isLogin) {
            //return access token and user object
            loggedInUser({
                token: data.token,
                user: data.user
            })
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
        
        {/*<p>Testing Email: bekobaj366@pmdeal.com</p>*/}

        <h2 class = "login-header">{isLogin ? "Login:" : "Register:"}</h2>
        
        {/* onSubmit: runs handleSubmit when form is sumbitted */}
        <form class = "login-form" onSubmit = {handleSubmit}>
            
            Email:
            <input 
                class = "login-input"
                type = "email" //email input type
                placeholder = "Enter Email" //temp text in input box
                //[e.target.value] gets value from what was entered on input
                onChange = {(e) => setEmail(e.target.value)} //changes email to entered email after form is submitted
                required //box must be filled before submission
            />

            Password:
            <input
                class = "login-input"
                type = "password" //password input type
                placeholder = "Enter Password" //temptext in input box
                onChange = {(e) => setPassword(e.target.value)} //changes password to entered password after form is submitted
                required //box must be filled before submission
            />

            <button class = "login-button" type = "Submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        

        {/*Conditional rendering: if there is text in message, then print paragraph of the message. 
            if there is no text: end process.
            acts like boolean checking proceess
        */}
        {message && <p>{message}</p>}

        {/* Button to toggle between signing up and loging in */}
        <button class = "login-switch-button"onClick = {() => setIsLogin(!isLogin)}> 
            {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
        </button>

    </div>
  );

}

export default LoginPage;