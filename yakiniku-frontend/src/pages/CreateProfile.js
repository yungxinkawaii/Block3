import React, { useState } from "react";
import { useStateContext } from "../context/profile";
import { ConnectWallet } from "@thirdweb-dev/react";

const CreateProfile = () => {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    image: "",
  });

  const { createProfile, connect } = useStateContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!connect) return;
    if (!form.name || !form.bio || !form.image) return;

    createProfile(form);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="connect">
        <ConnectWallet />
      </div>
      <h1>Create Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            id="bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateProfile;
