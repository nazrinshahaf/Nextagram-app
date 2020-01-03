import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingCircle from "./LoadingCircle";
import placeholder from "./ImagePlaceholder.png";

const UserImages = ({ usersId }) => {
  const [userImg, setUserImg] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://insta.nextacademy.com/api/v1/images/?userId=${usersId}`)
      .then(result => {
        setUserImg(result.data);
        setLoading(false);
      })
      .catch(error => {
        console.log("yo wtf: ", error);
      });
  }, []);

  if (loading) return <LoadingCircle loading={loading}></LoadingCircle>;

  return (
    <>
      <img className="UserImage" src={userImg[0]}></img>
    </>
  );
};

export default UserImages;
