import React, { useState } from "react";
import "./UploadImg.css";
import imgIcon from "./Upload_img.png";
import Axios from "axios";

const UploadImg = ({ showUploadImage, setShowUploadImage }) => {
  const [userImageUpload, setUserImageUpload] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [userImageName, setUserImageName] = useState("");

  let JWT = localStorage.getItem("JWT");

  let formData = new FormData();

  formData.append("image", userImageUpload);

  const HandleCancel = () => {
    setShowUploadImage(false);
  };

  const HandleDelete = () => {
    setUserImageName("");
    setPreviewImage(null);
    setUserImageUpload(null);
  };
  const HandleImage = e => {
    setUserImageUpload(e.target.files[0]);

    setPreviewImage(URL.createObjectURL(e.target.files[0]));

    setUserImageName(e.target.files[0].name);

    e.target.value = "";
  };

  const HandleUpload = () => {
    if (previewImage) {
      Axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
        headers: { Authorization: `Bearer ${JWT}` }
      })
        .then(result => {
          console.log(result.data);
          setUserImageName("");
          alert("image Uploaded Succesfully");
          setUserImageName("");
          setPreviewImage(null);
          setUserImageUpload(null);
        })
        .catch(error => {
          console.log("Error Image upload: ", error);
        });
    }
  };
  return (
    <div>
      <div className="Upload-image-container">
        <h2 className="Upload-image-title">Upload An Image</h2>
        <div className="Image-drop-container">
          {previewImage === null ? (
            <div></div>
          ) : (
            <img src={previewImage} className="Preview-image"></img>
          )}
          <img
            src={imgIcon}
            style={{ display: previewImage === null ? "" : "none" }}
            className="Img-icon"
          ></img>
          <p
            className="Drag-text"
            style={{ display: previewImage === null ? "" : "none" }}
          >
            Image Preview
          </p>
        </div>
        {previewImage !== null ? (
          <button className="delete-btn" onClick={HandleDelete}>
            {" "}
            X{" "}
          </button>
        ) : (
          <div></div>
        )}

        <span className="Selected-image-name">
          <p>{previewImage !== null ? userImageName : "No image selected"}</p>
        </span>

        <div className="button-container">
          <button className="Cancel-btn2" onClick={HandleCancel}>
            Cancel
          </button>
          <input
            disabled={previewImage !== null}
            type="file"
            name="image-file"
            className="Choose-image-input"
            onChange={HandleImage}
            multiple={false}
            id="file-upload-image"
          />{" "}
          <label
            onClick={HandleUpload}
            for="file-upload-image"
            style={{
              backgroundColor: previewImage !== null ? "#56d58b" : "#3897f0",
              padding: previewImage !== null ? "1.2vh 1.6vw" : ""
            }}
          >
            {previewImage !== null ? "Post Image" : "Choose Image"}
          </label>
        </div>
      </div>
      <div className="background-blackout" onClick={HandleCancel}></div>
    </div>
  );
};

export default UploadImg;
