import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = ({
  showSignUp,
  setShowSignUp,
  showLogIn,
  setShowLogIn,
  setIsLoggedIn,
  isLoggedIn,
  setLoggedInUserId,
  loggedInUserId
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [usernameValid, setUserNameValid] = useState("");

  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleCancel = () => {
    setShowSignUp(false);
  };

  const handleHaveAccount = () => {
    setShowSignUp(false);
    setShowLogIn(true);
  };

  const handleUsername = e => {
    setUsername(e.target.value);
    // console.log(username);

    if (username.length >= 5) {
      setUserNameValid(null);
      clearTimeout(timer);

      const newTimer = setTimeout(() => {
        axios
          .get(
            `https://insta.nextacademy.com/api/v1/users/check_name?username=${username}`
          )
          .then(result => {
            // console.log(result.data);
            setUserNameValid(result.data.valid);
          })
          .catch(error => {
            console.log("Error: ", error);
          });
      }, 200);

      setTimer(newTimer);
    }
  };

  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassowrd = e => {
    setPassword(e.target.value);
  };
  const handleComfirmPassword = e => {
    setComfirmPassword(e.target.value);
  };

  let history = useHistory();

  const handleSumbit = e => {
    if (username.length < 5) {
      setErrorMessage("Username must be more than 5 letters");
      setPassword("");
      setComfirmPassword("");
    } else if (username.indexOf(" ") >= 0) {
      setErrorMessage("Spaces in username not allowed");
      setPassword("");
      setComfirmPassword("");
    } else if (
      email.toLocaleLowerCase().indexOf("@") === -1 &&
      email.toLocaleLowerCase().indexOf(".com") === -1
    ) {
      setErrorMessage("Must use a valid email adress");
      setPassword("");
      setComfirmPassword("");
    } else if (password.length < 8) {
      setErrorMessage("Password must be more than 8 letters");
      setPassword("");
      setComfirmPassword("");
    } else if (comfirmPassword !== password) {
      setErrorMessage("Password is not the same");
      setPassword("");
      setComfirmPassword("");
    } else {
      setLoading(true);
      axios({
        method: "post",
        url: "https://insta.nextacademy.com/api/v1/users/",
        data: {
          username: username,
          email: email,
          password: password
        }
      })
        .then(result => {
          // console.log(result);
          // console.log(result.data);
          setShowSignUp(false);
          alert(`Welcome ${username}!`);
          setErrorMessage("");

          localStorage.setItem("loggedInUserId", result.data.user.id);
          localStorage.setItem("JWT", result.data.auth_token);
          localStorage.setItem(
            "loggedInUserUsername",
            result.data.user.username
          );
          localStorage.setItem(
            "loggedInUserProfileImage",
            result.data.user.profile_picture
          );

          setLoggedInUserId(result.data.user.id);
          setIsLoggedIn(true);
          setLoading(false);

          history.push(`/`);
        })
        .catch(error => {
          console.log("Error ", error.response.data);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <div className="Sign-up-form-container">
        <h2 className="Sign-up"> Sign Up</h2>
        <div className="Username-container">
          <input
            className={`Input-sign-up Username-input ${
              usernameValid && username.length >= 5 ? "valid" : "invalid"
            }`}
            placeholder="Username"
            value={username}
            onChange={handleUsername}
          ></input>
        </div>
        <div className="Email-container">
          <input
            className="Input-sign-up"
            type="Email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          ></input>
        </div>
        <div className="Password-container">
          <input
            className={`Input-sign-up ${
              password.length > 15
                ? "valid"
                : password.length > 8
                ? "weak"
                : "invalid"
            }
            `}
            type="Password"
            placeholder="Password"
            value={password}
            onChange={handlePassowrd}
          ></input>
        </div>
        <div className="Password-container">
          <input
            className={`Input-sign-up ${
              password === comfirmPassword && comfirmPassword.length > 8
                ? "valid"
                : "invalid"
            }`}
            type="password"
            placeholder="Comfirm Password"
            value={comfirmPassword}
            onChange={handleComfirmPassword}
          ></input>
        </div>

        <div className="error-messages-container">
          <span className="error-messages">{errorMessage}</span>
        </div>

        <div
          className="Button-container"
          style={{ marginTop: errorMessage.length > 1 ? "3.5vh" : "5vh" }}
        >
          <button className="Cancel-btn Sign-up-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="Sign-up-btn"
            onClick={handleSumbit}
            disabled={
              username.length < 1 ||
              email.length < 1 ||
              password.length < 1 ||
              comfirmPassword.length < 1 ||
              loading === true
            }
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
        <div>
          <p
            className="Already"
            style={{ marginTop: errorMessage.length > 1 ? "3.5vh" : "5vh" }}
          >
            Have an account?{" "}
            <span
              onClick={handleHaveAccount}
              style={{
                cursor: "pointer",
                color: "#3897f0"
              }}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
      <div className="modal" onClick={handleCancel}></div>
    </div>
  );
};

export default SignUp;
