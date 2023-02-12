import React, { useState, useEffect } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useStateContext } from "../context/profile";


const Profile = () => {
  const [profile, setProfile] = useState({});
  const { getProfile, address } = useStateContext();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProfile(address);
      setProfile(result);
    };

    fetchData();
  }, [address, getProfile]);

  return (
    <div>
      <div className="connect">
        <ConnectWallet />
      </div>
      <h1>Profile</h1>
      <div>
        <p>Name: {profile.name}</p>
        <p>Bio: {profile.bio}</p>
        <p>Image: {profile.image}</p>
        <p>NFT: {profile.NFT}</p>
        <p>Date: {profile.date}</p>
      </div>
    </div>
  );
};

export default Profile;
