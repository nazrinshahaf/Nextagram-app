import React, { useState } from "react";

const UserComment = () => {
  const [userComment, setUserComment] = useState("");

  const HandleInput = e => {
    console.log(e.target.value);
    setUserComment(e.target.value);
  };

  return (
    <input
      onChange={HandleInput}
      className="Comment-section-input"
      placeholder="Add a comment..."
      text={userComment}
    ></input>
  );
};

export default UserComment;
