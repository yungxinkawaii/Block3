import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useContractRead,
  useMetamask,
} from "@thirdweb-dev/react";
import config from "../config.json";
import axios from "axios";

const contractAddress = config.nftMarketplaceAddress;
const StateContext = createContext();
const ethers = require("ethers");

export const NftMarketplaceContextProvider = ({ children }) => {
  const { contract } = useContract(contractAddress);
  console.log(contract);
  let { listingPrice, isLoading } = useContractRead(contract, "getListPrice");

  const address = useAddress();
  const connect = useMetamask();

  const getMyNFTs = async () => {
    //Get an NFT Token
    console.log("running here")
    let transaction = await contract.call("getMyNFTs");
    console.log(transaction)
    let sumPrice = 0;

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        console.log(tokenURI);
        let meta = await axios.get(tokenURI, {
          headers: {
            Accept: "text/plain",
          },
        });
        meta = meta.data;
        console.log(meta);

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
          // mintValues: meta.mintValArr,
        };
        sumPrice += Number(price);
        return item;
      })
    );
    return items;
  };

  const getAllNFTs = async () => {
    const transaction = await contract.call("getAllNFTs");

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.call("tokenURI", i.tokenId);
        console.log(tokenURI);
        let meta = await axios.get(tokenURI, {
          headers: {
            Accept: "text/plain",
          },
        });
        meta = meta.data;
        console.log(meta);

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          metadataURL: tokenURI,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
          // mintValues: meta.mintValArr,
        };
        return item;
      })
    );

    return items;
  };

  const getNFTData = async (tokenId) => {
    const tokenURI = await contract.call("tokenURI", tokenId);
    const listedToken = await contract.call("getListedTokenForId", tokenId);
    const redeemDetails = await contract.call("getRedeemDetailsForId", tokenId);

    let meta = await axios.get(tokenURI);
    meta = meta.data;
    console.log(listedToken);

    let item = {
      price: meta.price,
      tokenId: tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: meta.image,
      name: meta.name,
      description: meta.description,
      mintVal: redeemDetails.mintVal,
      redeemCodes: redeemDetails.redeemCodes,
    };

    return item;
  };

  const listNFT = async (metadataURL, price) => {
    let priceInEthers = ethers.utils.parseUnits(price, "ether");
    listingPrice = 0.01;
    listingPrice = listingPrice.toString();

    //actually create the NFT
    let data = await contract.call(
      "createToken",
      metadataURL,
      priceInEthers,
      { value: ethers.utils.parseEther(listingPrice) }
    );
    console.log(data);
    // let transaction = await contract.createToken(metadataURL, price, mintVal, {
    //   value: listingPrice,
    // });
    // const receipt = await transaction.wait();
    // let eventDetails = receipt.events[0].args;

    // let redeemDetails = {};
    // for (let i in mintVal) {
    //   redeemDetails[mintVal[i]] = eventDetails.redeemCodes[i];
    // }
    return data;
  };

  const issueNFT = async (tokenId, connectedAddresses, idxArr, mintVal) => {
    let data;
    try {
      data = await contract.call(
        "issueNFT",
        tokenId,
        connectedAddresses,
        idxArr,
        mintVal
      );
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
    return data;
  };

  const redeemNFT = async (redeemCode) => {
    let data;
    try {
      data = await contract.call("redeemNFT", redeemCode);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
    return data;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        getMyNFTs,
        getAllNFTs,
        getNFTData,
        listNFT,
        issueNFT,
        redeemNFT,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useNftMarketplaceContext = () => useContext(StateContext);
