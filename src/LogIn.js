import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LogIn = ({
  showLogIn,
  setShowLogIn,
  showSignUp,
  setShowSignUp,
  isLoggedIn,
  setIsLoggedIn,
  loggedInUserId,
  setLoggedInUserId
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();

  const handleUsername = e => {
    setUsername(e.target.value);
  };
  const handlePassowrd = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    axios({
      method: "post",
      url: "https://insta.nextacademy.com/api/v1/login",
      data: { username: username, password: password }
    })
      .then(result => {
        // console.log(result.data);

        setLoggedInUserId(result.data.user.id);
        setIsLoggedIn(true);
        setLoading(false);
        setShowLogIn(false);

        alert(`Welcome back ${username}!`);
        window.location.reload();

        localStorage.setItem("loggedInUserId", result.data.user.id);
        localStorage.setItem("JWT", result.data.auth_token);
        localStorage.setItem("loggedInUserUsername", result.data.user.username);
        localStorage.setItem(
          "loggedInUserProfileImage",
          result.data.user.profile_picture
        );

        history.push(`/`);
      })

      .catch(error => {
        console.log("Error ", error.response);
        setLoading(false);
        setErrorMessage("Wrong password or username");
        setPassword("");
      });
  };

  // console.log(loggedInUserId, "loggedInUserId");
  // console.log(isLoggedIn, "isLoggedIn");

  const handleCancel = () => {
    setShowLogIn(false);
    // console.log(showLogIn);
  };
  const handleSignUpInstead = () => {
    setShowLogIn(false);
    setShowSignUp(true);
  };

  return (
    <div>
      <div className="Sign-up-form-container Log-in-form-container">
        <h2 className="Sign-up Log-in">Log in</h2>
        <div className="Username-container">
          <input
            className=" Input-sign-up Username-input Input-log-in"
            placeholder="Username"
            value={username}
            onChange={handleUsername}
          ></input>
        </div>

        <div className="Password-container">
          <input
            className="Input-sign-up"
            type="Password"
            placeholder="Password"
            value={password}
            onChange={handlePassowrd}
          ></input>
        </div>

        <div className="error-messages-container">
          <span className="error-messages">{errorMessage}</span>
        </div>

        <div
          className="Button-container Button-container-Log-in"
          style={{ marginTop: errorMessage.length > 1 ? "2vh" : "" }}
        >
          <button className="Cancel-btn Sign-up-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="Sign-up-btn"
            onClick={handleSubmit}
            disabled={
              username.length < 1 || password.length < 8 || loading === true
            }
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>
        <div>
          <p
            className="Already-sign"
            style={{ marginTop: errorMessage.length > 1 ? "4vh" : "" }}
          >
            Dont have an account?{" "}
            <span
              onClick={handleSignUpInstead}
              style={{ cursor: "pointer", color: "#3897f0" }}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
      <div className="modal" onClick={handleCancel}></div>
    </div>
  );
};
export default LogIn;
