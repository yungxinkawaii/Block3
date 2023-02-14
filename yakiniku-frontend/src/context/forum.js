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

  const { mutateAsync: createForum } = useContractWrite(
    contract,
    "createForum"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishForum = async (form) => {
    try {
      console.log(form.title);
      const data = await createForum([
        form.title,
        form.description,
        form.image,
      ]);

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getAllForums = async () => {
    const forums = await contract.call("getAllForums");

    const parsedForums = forums.map((forum, i) => ({
      id: forum.id.toNumber(),
      title: forum.title,
      date: new Date(forum.date.toNumber() * 1000).toString(),
      description: forum.description,
      creator: forum.creator,
      image: forum.image,
    }));

    console.log(parsedForums);
    return parsedForums;
  };

  const getForumComments = async (forumId) => {
    const comments = await contract.call("getForumComments", forumId);

    const parsedComments = comments.map((comment, i) => ({
      text: comment.text,
      date: new Date(comment.date.toNumber() * 1000).toString(),
      creator: comment.creator,
    }));

    console.log(parsedComments);
    return parsedComments;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createForum: publishForum,
        getAllForums,
        getForumComments,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useForumContext = () => useContext(StateContext);
