import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import icon from "../../assets/icon.png";
import "./Auth.css";
import AboutAuth from "./AboutAuth";

import { signup, login, recoverPassword } from "../../actions/auth";

const Auth = () => {
  //isSignupPage?? initially false ie we are not on signup
  const [isSignup, setIsSignup] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };

  const notify = (message) => toast.success(`${message}`);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email && !password) {
      notify("Please enter email and password!");
    }

    if (isSignup) {
      // SIGNUP PAGE

      if (!name) {
        notify("Please enter Username!");
      }
      dispatch(signup({ name, email, password }, navigate));
    } else {
      // LOGIN PAGE
      if (forgotPassword) {
        notify("OTP sent successfully");
        dispatch(recoverPassword({ useremail: email }, navigate));
      } else {
        dispatch(login({ email, password }, navigate));
      }
    }
  };
  return (
    <section className="auth-section">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {isSignup && <AboutAuth />}
      <div className="auth-container-2">
        {!isSignup && (
          <img src={icon} alt="StackOverflow Icon" className="login-logo" />
        )}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Username:</h4>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter Display Name:"
                className="input-width"
              />
            </label>
          )}
          {!forgotPassword && (
            <>
              <label htmlFor="email">
                <h4>Email:</h4>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter Email"
                className="input-width"
              />
              <label htmlFor="">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4>Password:</h4>
                </div>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter Password"
                className="input-width"
              />
            </>
          )}
          {!isSignup && (
            <h4
              className="cursor-pointer"
              style={{ color: "#007ac6", fontSize: "13px" }}
              onClick={() => {
                setForgotPassword(!forgotPassword);
              }}
            >
              Forgot Password?
            </h4>
          )}
          {forgotPassword && (
            <>
              <label htmlFor="femail">Enter Email </label>
              <input
                type="email"
                id="femail"
                name="femail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter email"
                className="input-width"
              />
            </>
          )}
          {isSignup && (
            <p style={{ color: "#666767", fontSize: "13px" }}>
              password must contain 8 characters ,<br /> including atleast 1
              letter and number
            </p>
          )}

          {isSignup && (
            <label htmlFor="check" className="flex1">
              <input type="checkbox" id="check" />
              <p style={{ fontSize: "13px" }}>
                Opt-in to recieve occastional <br /> product updates , user
                research invitations,
                <br />
                company announcements, and digests.
              </p>
            </label>
          )}

          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>
          {isSignup && (
            <p style={{ color: "#666767", fontSize: "13px" }}>
              By clicking "Sign up" , you agree to our
              <span style={{ color: "#007ac6" }}>
                terms of <br />
                service
              </span>
              ,<span style={{ color: "#007ac6" }}> privacy policy</span>, and
              <span style={{ color: "#007ac6" }}> cookie policy</span>
            </p>
          )}
        </form>
        <p>
          {isSignup ? "Already have an Account?" : "Create a new Account"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Login" : "Signup"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
