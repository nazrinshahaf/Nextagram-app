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
  const [showCommentSection, setShowCommentSection] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("JWT") !== null
  );
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const [users, setUsers] = useState([]);

  if (
    showSignUp === true ||
    showLogIn === true ||
    showUploadImage === true ||
    showCommentSection === true
  ) {
    document.body.style.overflow = "hidden";
  }

  if (
    showCommentSection === false &&
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
          showCommentSection={showCommentSection}
          setShowCommentSection={setShowCommentSection}
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
