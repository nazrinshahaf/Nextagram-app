import React, { useEffect, useState } from "react";
import Axios from "axios";
import Moment from "react-moment";

import UserComment from "./UserComment";

import LikeIcon from "./like_icon2.png";
import CommentIcon from "./comment_icon.png";
import plane from "./paper-plane.png";
import bookmark from "./bookmark.png";

import "./CommentSection.css";

const CommentSection = ({ setShowCommentSection, users, setUsers }) => {
  const [comments, setComments] = useState([]);
  const [commentAmmount, setCommentAmount] = useState(null);

  const handleCancel = () => {
    setShowCommentSection(false);
  };
  let JWT = localStorage.getItem("JWT");
  // console.log(JWT);

  console.log(users);

  useEffect(() => {
    Axios.get(`https://insta.nextacademy.com/api/v1/images/1/comments`, {
      headers: { Authorization: `Bearer ${JWT}` }
    })
      .then(result => {
        // console.log(result.data);
        // console.log(result.data[0].content);
        setComments([...result.data]);
        setCommentAmount(result.data.length);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="background-blackout" onClick={handleCancel}></div>
      <div className="Comment-section-container">
        <div className="Comment-section-image-container">
          <img></img>
        </div>
        <div className="Comment-section-comment-container">
          <div className="Comment-section-user-container">Header</div>
          <div className="Comment-section-comment">
            <ul className="Comment-section-ul">
              {comments.map(comment => (
                <li className="Comment-section-li">
                  <div className="Comment-section-box">
                    <img
                      className="Comment-section-poster-profile-image"
                      src={comment.posted_by.profileImage}
                    ></img>
                    <p className="Comment-section-content">{comment.content}</p>
                  </div>
                  <p>
                    <Moment
                      fromNow
                      ago
                      className="Comment-section-comment-time"
                    >
                      {comment.created_at}
                    </Moment>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="Comment-section-profile-bar">
            <img src={LikeIcon} className="Comment-section-icons"></img>
            <img src={CommentIcon} className="Comment-section-icons"></img>
            <img src={plane} className="Comment-section-icons"></img>
            <img
              src={bookmark}
              className="Comment-section-icons"
              id="bookmark"
            ></img>
          </div>
          <div className="Comment-section-user-input">
            <UserComment></UserComment>
            <button className="Comment-section-post-btn">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
