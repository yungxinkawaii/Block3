import React, { useState, useEffect } from "react";
import Card from "../components/ForumCard";
import { useForumContext } from "../context/forum";

const Dashboard = () => {
  const { getAllForums } = useForumContext();
  const [forums, setForums] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const forums = await getAllForums();
      setForums(forums);
    }

    fetchData();
  });

  return (
    <div className="dashboard">
      {forums.map((forum) => (
        <Card
          key={forum.id}
          title={forum.title}
          description={forum.description}
          image={forum.image}
        />
      ))}
    </div>
  );
};

export default Dashboard;
