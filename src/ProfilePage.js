import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { username, userId } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userImg, setUserImg] = useState([]);

  let loggedInUserId = localStorage.getItem("loggedInUserId");
  console.log(userId);
  console.log("loggedInUserID", loggedInUserId);

  let history = useHistory();

  useEffect(() => {
    if (loggedInUserId === userId) {
      history.push(`/MyProfile`);
    } else {
      Axios.get("https://insta.nextacademy.com/api/v1/users/" + userId)
        .then(result => {
          setUser(result.data);
        })
        .catch(error => {
          console.log("Username not found", error);
        });

      Axios.get(`https://insta.nextacademy.com/api/v1/images/?userId=${userId}`)
        .then(result => {
          // console.log(result.data);
          setLoading(false);
          setUserImg([...result.data]);
        })
        .catch(error => {
          console.log("Img not found", error);
        });
    }
  }, [userId]);

  return (
    <>
      <div className="ProfilePageBody">
        <div className="ProfilePageHeader">
          <div className="ProfilePageProfileImageContainer">
            <div className="ProfilePageUserImgContainer">
              <img src={user.profileImage} className="ProfilePageUserImg"></img>
            </div>
          </div>
          <div className="ProfilePageContent">
            <div className="ProfilePageFollowers">
              <h2 className="ProfilePageUserName">{user.username}</h2>

              <div className="ProfilePageFollowButton">Follow</div>

              {/* <div className="ProfilePageDropDown">
                <div className="triangle"></div>
              </div> */}
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
        {userImg.map(img => (
          <div className="ProfilePageImgContainer">
            <img className="ProfilePageImg" src={img}></img>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfilePage;
