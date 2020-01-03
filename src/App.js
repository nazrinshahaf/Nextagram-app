import React, { useState } from "react";
import { Route } from "react-router-dom";

import Navbar from "./Navbar";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import MyProfile from "./MyProfile";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [showUploadImage, setShowUploadImage] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("JWT") !== null
  );
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const [users, setUsers] = useState([]);

  if (showSignUp === true || showLogIn === true || showUploadImage === true) {
    document.body.style.overflow = "hidden";
  }

  if (
    showSignUp === false &&
    showLogIn === false &&
    showUploadImage === false
  ) {
    document.body.style.overflow = "scroll";
  }

  return (
    <div>
      <Navbar
        showSignUp={showSignUp}
        setShowSignUp={setShowSignUp}
        showLogIn={showLogIn}
        setShowLogIn={setShowLogIn}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        loggedInUserId={loggedInUserId}
        setLoggedInUserId={setLoggedInUserId}
        showUploadImage={showUploadImage}
        setShowUploadImage={setShowUploadImage}
      ></Navbar>

      <Route exact path="/" component={HomePage}>
        <HomePage
          users={users}
          setUsers={setUsers}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Route>

      <Route exact path="/ProfilePage/:userId" component={ProfilePage}>
        <ProfilePage
          setIsLoading={setIsLoading}
          users={users}
          setUsers={setUsers}
        />
      </Route>
      <Route exact path="/MyProfile" component={MyProfile}>
        <MyProfile />
      </Route>
    </div>
  );
}

export default App;
