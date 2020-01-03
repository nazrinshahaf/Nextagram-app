import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { render } from "@testing-library/react";

const MyProfile = () => {
  const [loggedInUserImages, setLoggedInUserImages] = useState([]);
  let loggedInUserUsername = localStorage.getItem("loggedInUserUsername");
  let loggedInUserId = localStorage.getItem("loggedInUserId");
  let loggedInUserProfileImage = localStorage.getItem(
    "loggedInUserProfileImage"
  );
  console.log(loggedInUserUsername);
  console.log(loggedInUserId);
  console.log(loggedInUserProfileImage);

  useEffect(() => {
    Axios.get(`https://insta.nextacademy.com/api/v1/users/${loggedInUserId}`)
      .then(result => {
        console.log(result.data);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
    Axios.get(
      `https://insta.nextacademy.com/api/v1/images/?userId=${loggedInUserId}`
    )
      .then(result => {
        console.log([...result.data]);
        setLoggedInUserImages([...result.data]);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  }, []);

  return (
    <>
      <div className="ProfilePageBody">
        <div className="ProfilePageHeader">
          <div className="ProfilePageProfileImageContainer">
            <div className="ProfilePageUserImgContainer">
              <img
                src={loggedInUserProfileImage}
                className="ProfilePageUserImg"
              ></img>
            </div>
          </div>
          <div className="ProfilePageContent">
            <div className="ProfilePageFollowers">
              <h2 className="ProfilePageUserName">{loggedInUserUsername}</h2>
              <div className="ProfilePageFollowButton">Settings</div>
              <div className="ProfilePageProfileInfo">
                <p> XXXX post</p>
                <p> XXXX followers</p>
                <p> XXXX following</p>
              </div>
            </div>
            <div className="ProfilePageDescription">
              <p>
                HelloHello Hello Hello Hello Hello Hello Hello Hello Hello
                HelloHelloHello Hello Hello Hello Hello Hello Hello Hello Hello
                HelloHelloHello Hello Hello Hello Hello Hello Hello Hello Hello
                HelloHelloHello Hello Hello Hello Hello Hello Hello Hello Hello
                HelloHelloHello Hello Hello Hello Hello Hello Hello Hello Hello
                Hello
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="ProfilePageImages">
        {loggedInUserImages.map(img => (
          <div className="ProfilePageImgContainer">
            <img className="ProfilePageImg" src={img}></img>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyProfile;
