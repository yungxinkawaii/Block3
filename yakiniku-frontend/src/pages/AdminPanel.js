import { React, useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  Spacer,
} from "@chakra-ui/react";
import NFTTable from "../components/NFTTable";
import { AddIcon } from "@chakra-ui/icons";
import { useNftMarketplaceContext } from "../context/nftMarketplace";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/pinata";

const AddNFTModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
    mintValue: []
  });
  const [fileURL, setFileURL] = useState(null);
  const [message, updateMessage] = useState("");

  const { listNFT } = useNftMarketplaceContext();

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    var file = e.target.files[0];
    //check for file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        let url = response.pinataURL;
        console.log("Uploaded image to Pinata: ", url);
        setFileURL(url);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  //This function uploads the metadata to IPDS
  async function uploadMetadataToIPFS(mintValArr) {
    const { name, description, price } = formParams;
    //Make sure that none of the fields are empty
    if (!name || !description || !price || !fileURL) return;

    const nftJSON = {
      name,
      description,
      price,
      mintValArr,
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  async function callListNFT(e) {
    let mintValArr = [];
    for (let i in formParams.mintValue){
      mintValArr.push(Number(formParams.mintValue[i]));
    } 
    updateFormParams({ ...formParams, mintValue: mintValArr });

    e.preventDefault();
    try {
      updateMessage("Please wait.. uploading (upto 5 mins)");
      const metadataURL = await uploadMetadataToIPFS(mintValArr);

      let nftListed = await listNFT(metadataURL, formParams.price, mintValArr);
      console.log(nftListed);
      let eventDetails = nftListed.receipt.events[0].args;
      let redeemDetails = {};
      for (let i in mintValArr) {
        redeemDetails[mintValArr[i]] = eventDetails.redeemCodes[i];
      }
      console.log(redeemDetails);
      console.log(nftListed.logs);

      alert("Successfully listed your NFT!");
      updateMessage("");
      updateFormParams({ name: "", description: "", price: "" });
    } catch (err) {
      alert("Upload error" + err);
    }
  }

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="secondary"
        rightIcon={<AddIcon boxSize={3} />}
      >
        Add NFT
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl id="NFTName">
                <FormLabel>NFT Name</FormLabel>
                <Input
                  type="text"
                  onChange={(e) =>
                    updateFormParams({ ...formParams, name: e.target.value })
                  }
                  value={formParams.name}
                />
              </FormControl>
              <FormControl id="NFTDescription">
                <FormLabel>NFT Description</FormLabel>
                <Input
                  type="text"
                  value={formParams.description}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      description: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl id="NFTPrice">
                <FormLabel>NFT Price</FormLabel>
                <Input
                  type="number"
                  placeholder="Min 0.01 ETH"
                  step="0.01"
                  value={formParams.price}
                  onChange={(e) =>
                    updateFormParams({ ...formParams, price: e.target.value })
                  }
                />
              </FormControl>
              <FormControl id="NFTMintValue">
                <FormLabel>NFT Mint Value</FormLabel>
                <Input
                  type="text"
                  placeholder="Mint value(s) separated by ','"
                  value={formParams.mintVal}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      mintValue: (e.target.value).split(','),
                    })
                  }
                />
              </FormControl>
              <FormControl id="NFTImage">
                <FormLabel>Upload Image</FormLabel>
                <input type={"file"} onChange={OnChangeFile}></input>
              </FormControl>
              <br></br>
              <div className="text-green text-center">{message}</div>
              <Button onClick={callListNFT} colorScheme={"primary"}>
                List NFT
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
export default function AdminPanel() {

  const [nftData, updateNftData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const { getAllNFTs } = useNftMarketplaceContext();

    async function callGetAllNFTs() {

      let nftListed = await getAllNFTs();
      console.log(nftListed);
      
      updateFetched(true);
      updateNftData(nftListed);
    }

    if (!dataFetched) {
      setTimeout(() => {
        callGetAllNFTs();
      }, 1000);
    }

  return (
    <div>
      {/* 3. A page for displaying details for a particular NFT 
          - NFT details
          - A form for me to list the emails of students 
          - issue NFT Button
          - coupon code section
          - a table to show the redeem details (columns: no., wallet address, redeem state) */}
      {/*One thing to remind for profile page for student - a form where i could
			enter the redeem code and Redeem NFT button */}
      <Flex mb="4">
        <Heading size={"lg"}>NFTs</Heading>
        <Spacer />

        <AddNFTModal />
        {/* 1. Put this in a modal form to list/create a NFT (with the details: NFT Name, NFT Description, Price, Upload Image, List NFT button) */}
      </Flex>
      {/* 2. A table showing all the NFTs, each row comes with NFT details and a button to direct to NFT details page at 3. */}
      <NFTTable nftData={nftData} />
    </div>
  );
}
