import React, { useState } from 'react';
import StorefrontIcon from "@material-ui/icons/Storefront";
import "./SignIn.css";
import { Link } from "react-router-dom";

export default function SignIn() {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
      setPassword(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(Email, Password);
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
          <form onSubmit={handleSubmit}>
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
            <button className="create-button">Create Account</button>
          </form>
        </div>
      </div>
    );
}
