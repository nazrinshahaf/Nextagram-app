import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import UserImages from "./UserImages";
import LoadingCircle from "./LoadingCircle";

import "./HomePage.css";
import "./LoggedInInformation.css";

const HomePage = ({
  users,
  setUsers,
  setIsLoading,
  isLoading,
  isLoggedIn,
  setIsLoggedIn
}) => {
  let loggedInUserProfileImage = localStorage.getItem(
    "loggedInUserProfileImage"
  );
  let loggedInUserUsername = localStorage.getItem("loggedInUserUsername");

  useEffect(() => {
    axios
      .get("https://insta.nextacademy.com/api/v1/users")
      .then(result => {
        setUsers(result.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, []);

  if (isLoading) {
    return <LoadingCircle isLoading={isLoading}></LoadingCircle>;
  }

  return (
    <div>
      {isLoggedIn ? (
        <div className="LoggedInInformation">
          <div className="LoggedInUserImageContainer">
            <img
              src={loggedInUserProfileImage}
              className="LoggedInUserImage"
            ></img>
            <p className="LoggedInUserUsername">{loggedInUserUsername}</p>
          </div>
          <div className="LoggedInUserFriendStories">
            <div className="LoggedInUserFriendsHeader">
              <p className="Stories-title">Stories</p>
              <p className="Watch-all-title">Watch All</p>
            </div>
            <div className="LoggedInUserFriends">
              <ul className="LoggedInUserFriendsListParent">
                {users.map((user, index) => (
                  <li className="LoggedInUserFriendsList" key={index}>
                    <img
                      src={user.profileImage}
                      className="LoggedInUserFriendsProfileImage"
                    ></img>
                    <p className="LoggedInUserFriendsListUsername">
                      {user.username}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="LoggedInUserSuggestedFriends"></div>
        </div>
      ) : (
        <div></div>
      )}

      <div className="ListContainer">
        <ul className="UserList">
          {users.map((user, index) => (
            <li key={index}>
              <div className="UserListContainer">
                <div className="UserProfileImageContainer">
                  <img
                    className="UserProfileImage"
                    src={user.profileImage}
                  ></img>
                </div>
                <Link exact to={`/ProfilePage/${user.id}`}>
                  <p className="UserName"> {user.username}</p>
                </Link>
                <div className="DotContainer">
                  <div className="Dots"></div>
                  <div className="Dots"></div>
                  <div className="Dots"></div>
                </div>
                <UserImages className="UserImage" usersId={user.id} />
                <div className="ProfileBar"></div>
                <div className="Comment-section">
                  <input
                    className="Comment-section-input"
                    placeholder="Add a comment..."
                  ></input>
                  <button className="Post-comment-btn">Post</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
