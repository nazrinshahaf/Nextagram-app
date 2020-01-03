import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import UserImages from "./UserImages";
import LoadingCircle from "./LoadingCircle";
import UserComment from "./UserComment";

import LikeIcon from "./like_icon2.png";
import CommentIcon from "./comment_icon.png";

import "./HomePage.css";
import "./LoggedInInformation.css";

const HomePage = ({
  users,
  setUsers,
  setIsLoading,
  isLoading,
  isLoggedIn,
  setIsLoggedIn,
  setShowCommentSection,
  showCommentSection
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
            <Link exact to={`/MyProfile`}>
              <img
                src={loggedInUserProfileImage}
                className="LoggedInUserImage"
              ></img>
            </Link>
            <Link exact to={`/MyProfile`}>
              <p className="LoggedInUserUsername">{loggedInUserUsername}</p>
            </Link>
          </div>
          <div className="LoggedInUserFriendStories">
            <div className="LoggedInUserFriendsHeader">
              <p className="Stories-title">Friends</p>
              <p className="Watch-all-title">Watch All</p>
            </div>
            <div className="LoggedInUserFriends">
              <ul className="LoggedInUserFriendsListParent">
                {users.map((user, index) => (
                  <li className="LoggedInUserFriendsList" key={index}>
                    <div
                      className="LoggedInUserFriendsProfileImageContainer"
                      style={{ background: isLoading === true ? "none" : "" }}
                    >
                      <Link exact to={`/ProfilePage/${user.id}`}>
                        <img
                          src={user.profileImage}
                          className="LoggedInUserFriendsProfileImage"
                        ></img>
                      </Link>
                    </div>
                    <Link exact to={`/ProfilePage/${user.id}`}>
                      <p className="LoggedInUserFriendsListUsername">
                        {user.username}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <div className="LoggedInUserSuggestedFriends"></div> */}
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
                <div className="ProfileBar">
                  <img
                    src={LikeIcon}
                    className="Comment-section-like-icon"
                  ></img>
                  <img
                    src={CommentIcon}
                    className="Comment-section-comment-icon"
                  ></img>
                </div>
                <div className="Comment-section">
                  <UserComment></UserComment>
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
