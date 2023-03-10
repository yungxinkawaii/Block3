import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import config from "../config.json";

const contractAddress = config.profileContractAddress;
const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const { contract } = useContract(contractAddress);
  console.log(contract);
  const { mutateAsync: createProfile } = useContractWrite(
    contract,
    "createProfile"
  );
  const { mutateAsync: updateProfile } = useContractWrite(
    contract,
    "updateProfile"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishProfile = async (form) => {
    try {
      console.log(form.name);
      const data = await createProfile([form.name, form.bio, form.image]);

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
      console.log("address already exist.");
    }
  };

  const getAddrByEmail = async (emails) => {
    let retAddr = [];

    for (let i in emails) {
      let eachEmail = emails[i];
      let temp = [];
      for (let j in eachEmail) {
        let addr = await contract.call("getAddrByEmail", eachEmail[j]);
        temp.push(addr);
      }
      retAddr.push(temp);
    }
    console.log(retAddr);
    return retAddr;
  };

  const putProfile = async (form) => {
    try {
      console.log(form.name);
      const data = await updateProfile([form.name, form.bio, form.image]);

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
      console.log("profile does not exist.");
    }
  };

  const getProfile = async (userAddress) => {
    const profile = await contract.call("getProfile", userAddress);
    console.log(profile);

    const parsedProfile = {
      name: profile[0],
      bio: profile[1],
      image: profile[2],
      NFT: profile[3],
      date: new Date(profile[4]["_hex"] * 1000).toString(),
    };

    return parsedProfile;
  };

  return (
    <ProfileContext.Provider
      value={{
        address,
        contract,
        connect,
        createProfile: publishProfile,
        updateProfile: putProfile,
        getProfile,
        getAddrByEmail,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
