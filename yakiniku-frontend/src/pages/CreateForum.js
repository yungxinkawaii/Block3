import React, { useState } from "react";
import { useForumContext } from "../context/forum";
import { ConnectWallet } from "@thirdweb-dev/react";

const CreateForum = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });
  const { createForum } = useForumContext();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createForum(form);
    setForm({
      title: "",
      description: "",
      image: "",
    });
  };

  return (
    <div>
      <div className="connect">
        <ConnectWallet />
      </div>
      <h1>Create Forum</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create Forum</button>
      </form>
    </div>
  );
};

export default CreateForum;
