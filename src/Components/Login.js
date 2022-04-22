import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

import "../Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // we have "" in it because we just replicating that the inputs are empty, dont set to null because inputs arent really ever null
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault(); // this prevents the page from refreshing

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
		  
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    // creates user with email and password
    // if everything is succesful it comes back to you with an auth object
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        
		// if successful bring back to home page
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // e.target.value bacially refers to what the user typed in
            required
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // e.target.value bacially refers to what the user typed in
            required
          />
          {/* when u change type to passworwd it comes as **** */}
          <button
            className="login__signInButton"
            type="submit"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button className="login__registerButton" onClick={register}>
          Create your amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
