import React from "react";

const CommentCard = ({ comment }) => {
  const cardStyle = {
    backgroundColor: "#301934",
    padding: "10px",
    margin: "10px",
  };

  return (
    <div style={cardStyle}>
      <p>{comment.text}</p>
      <p>{comment.date}</p>
      <p>{comment.creator}</p>
    </div>
  );
};

export default CommentCard;
