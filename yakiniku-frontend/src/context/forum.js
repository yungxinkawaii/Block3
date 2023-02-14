import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import config from "../config.json";

const contractAddress = config.forumContractAddress;
const StateContext = createContext();

export const ForumContextProvider = ({ children }) => {
  const { contract } = useContract(contractAddress);
  console.log(contract);

  //   const { mutateAsync: createProfile } = useContractWrite(
  //     contract,
  //     "createProfile"
  //   );

  const address = useAddress();
  const connect = useMetamask();

  //   const publishProfile = async (form) => {
  //     try {
  //       console.log(form.name);
  //       const data = await createProfile([form.name, form.bio, form.image]);

  //       console.log("contract call success", data);
  //     } catch (error) {
  //       console.log("contract call failure", error);
  //       console.log("address already exist.");
  //     }
  //   };

  const getAllForums = async (userAddress) => {
    const forums = await contract.call("getAllForums");
    console.log(forums);

    const parsedForums = forums.map((forum, i) => ({
      id: forum.id.toNumber(),
      title: forum.title,
      date: new Date(forum.date.toNumber() * 1000).toString(),
      description: forum.description,
      creator: forum.creator,
      image: forum.image,
    }));

    return parsedForums;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        // createProfile: publishProfile,
        getAllForums,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useForumContext = () => useContext(StateContext);
