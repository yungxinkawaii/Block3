import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForumContext } from "../context/forum";
import CommentCard from "../components/CommentCard";

const Forum = () => {
  const location = useLocation();
  const forum = location.state;

  const [comments, setComments] = useState([]);
  const { getForumComments } = useForumContext();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getForumComments(forum.id);
      setComments(result);
    };

    fetchData();
  }, [forum.id, getForumComments]);

  return (
    <div>
      <h1>{forum.title}</h1>
      <img src={forum.image} alt={forum.title} />
      <p>{forum.description}</p>
      <p>Created by: {forum.creator}</p>
      <p>Date: {forum.date}</p>

      <h1>Comments</h1>
      {comments.map((comment, i) => (
        <CommentCard key={i} comment={comment} />
      ))}
    </div>
  );
};

export default Forum;
