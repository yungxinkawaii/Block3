import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForumContext } from "../context/forum";
import CommentCard from "../components/CommentCard";
import { ConnectWallet } from "@thirdweb-dev/react";

const Forum = () => {
  const location = useLocation();
  const forum = location.state;

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const { getForumComments, commentForum } = useForumContext();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getForumComments(forum.id);
      setComments(result);
    };

    fetchData();
  }, [forum.id, getForumComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim() === "") {
      return;
    }
    await commentForum(forum.id, commentText);
    setCommentText("");
    const result = await getForumComments(forum.id);
    setComments(result);
  };

  return (
    <div>
      <div className="connect">
        <ConnectWallet />
      </div>
      <h1>{forum.title}</h1>
      <img src={forum.image} alt={forum.title} />
      <p>{forum.description}</p>
      <p>Created by: {forum.creator}</p>
      <p>Date: {forum.date}</p>

      <h1>Comments</h1>
      {comments.map((comment, i) => (
        <CommentCard key={i} comment={comment} />
      ))}

      <h1>Add Comment</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Forum;
