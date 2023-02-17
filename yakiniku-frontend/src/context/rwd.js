import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import config from "../config.json";

const contractAddress = config.rwdContractAddress;
const StateContext = createContext();
const ethers = require("ethers");

export const RwdContextProvider = ({ children }) => {
  const { contract } = useContract(contractAddress);
  console.log(contract);

  const address = useAddress();
  const connect = useMetamask();

  const getBalance = async () => {
    let balance = await contract.call("balanceOf", address);
    balance = await ethers.utils.formatUnits(balance.toString(), "ether");

    return balance;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        getBalance,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useRwdContext = () => useContext(StateContext);
