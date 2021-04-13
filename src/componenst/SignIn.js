import React, { useState } from 'react';
import StorefrontIcon from "@material-ui/icons/Storefront";
import "./SignIn.css";
import { Link, useHistory } from "react-router-dom";
import * as firebase from "firebase/app";
import { auth } from "../firebase";
export default function SignIn() {
    const history = useHistory();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
      setPassword(e.target.value);
    };
    
    const signIn = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(Email, Password)
            .then(auth => {
                history.push('/');
            })
            .catch(error => alert(error.message));
    }
    const register = e => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(Email, Password)
            .then(auth => {
                console.log(auth);
                if (auth) {
                    history.push('/');
                }
            })
            .catch(error => alert(error.message));
    }
    return (
      <div className="sign-in-container">
        <div className="shop-logo">
          <Link className="link" to="/">
            <i>
              <StorefrontIcon />
              Shop
            </i>
          </Link>
        </div>
        <div className="sign-in__form">
          <h2>Sign In</h2>
          <form onSubmit={signIn}>
            {/* <h5>Email</h5> */}
            <input
              type="email"
              placeholder="Email"
              onChange={handleEmail}
              value={Email}
            />
            {/* <h5>Password</h5> */}
            <input
              type="password"
              placeholder="Password"
              onChange={handlePassword}
              value={Password}
            />
            <p>
              By signing in You accept all the terms and conditions of the shop.
            </p>
            <button type="submit">Sign In</button>
            <button onClick={register} className="create-button">Create Account</button>
          </form>
        </div>
      </div>
    );
}
