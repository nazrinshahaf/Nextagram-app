import React from "react";
import "./Navbar.css";
import icon from "./InstagramIcon.png";
import { Link, useHistory } from "react-router-dom";
import SignUp from "./SIgnUp";
import LogIn from "./LogIn";
import compassIcon from "./compass_icon.png";
import loveIcon from "./like_icon.png";
import peopleIcon from "./people_icon.png";
import UploadImg from "./UploadImg";

const Navbar = ({
  showSignUp,
  setShowSignUp,
  showLogIn,
  setShowLogIn,
  isLoggedIn,
  setIsLoggedIn,
  loggedInUserId,
  setLoggedInUserId,
  showUploadImage,
  setShowUploadImage
}) => {
  const ToggleLogIn = () => {
    setShowLogIn(!showLogIn);
    setShowSignUp(false);
  };
  const ToggleSignUp = () => {
    setShowSignUp(!showSignUp);
    setShowLogIn(false);
  };

  const ToggleShowUploadImage = () => {
    setShowUploadImage(!showUploadImage);
  };

  let history = useHistory();

  const HandleLogOut = () => {
    setIsLoggedIn(false);
    setLoggedInUserId(null);

    localStorage.setItem("loggedInUserId", null);
    localStorage.setItem("JWT", null);
    localStorage.setItem("loggedInUserUsername", null);
    localStorage.setItem("loggedInUserProfileImage", null);
    localStorage.clear();

    history.push(`/`);
    window.location.reload();
  };

  // console.log(isLoggedIn);
  // console.log(localStorage.getItem("loggedInUserProfileImage"));
  // console.log(localStorage.getItem("JWT"));
  // console.log(localStorage.getItem("loggedInUserId"));
  // console.log(localStorage.getItem("loggedInUserUsername"));

  let localStorangeUserID = localStorage.getItem("loggedInUserId");

  return (
    <div>
      <nav className="NavbarTop">
        <div className="NavbarTopLeft">
          <Link to="/">
            <img src={icon} alt="icon" className="InstagramIcon"></img>
          </Link>
          <div className="NavbatTopRightDivider"></div>
          <h1 className="NextagramText">Nextagram</h1>
        </div>
        <div className="NavbarTopMiddle">
          <input
            placeholder="Search"
            className="SearchBar"
            style={{ marginLeft: isLoggedIn === true ? "6.5vw" : "5.5vw" }}
          ></input>
        </div>

        {isLoggedIn === false ? (
          <div className="NavbarTopRight">
            <button className="Log-in-button" onClick={ToggleLogIn}>
              <Link>Log In</Link>
            </button>
            <button
              className="Log-in-button Sign-up-button"
              onClick={ToggleSignUp}
            >
              <Link>Sign Up</Link>
            </button>
          </div>
        ) : (
          <div className="NavbarTopRIght NavbarTopRightLoggedIn">
            <div>
              <img
                className="Navbar-icons"
                src={compassIcon}
                onClick={HandleLogOut}
              />
            </div>
            <div>
              <img
                src={loveIcon}
                className="Navbar-icons"
                onClick={ToggleShowUploadImage}
              />
            </div>
            <div>
              <Link exact to={`/MyProfile`}>
                {" "}
                <img src={peopleIcon} className="Navbar-icons" />
              </Link>
            </div>
          </div>
        )}
      </nav>
      {showSignUp === true ? (
        <SignUp
          showSignUp={showSignUp}
          setShowSignUp={setShowSignUp}
          showLogIn={showLogIn}
          setShowLogIn={setShowLogIn}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          loggedInUserId={loggedInUserId}
          setLoggedInUserId={setLoggedInUserId}
        />
      ) : (
        <div></div>
      )}
      {showLogIn === true ? (
        <LogIn
          showSignUp={showSignUp}
          setShowSignUp={setShowSignUp}
          showLogIn={showLogIn}
          setShowLogIn={setShowLogIn}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          loggedInUserId={loggedInUserId}
          setLoggedInUserId={setLoggedInUserId}
        />
      ) : (
        <div></div>
      )}
      {showUploadImage === true ? (
        <UploadImg
          showUploadImage={showUploadImage}
          setShowUploadImage={setShowUploadImage}
        ></UploadImg>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Navbar;
