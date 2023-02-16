import { React, useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
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
  Link,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useNftMarketplaceContext } from "../context/nftMarketplace";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/pinata";

const NFTTable = () => {
  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th isNumeric>Price</Th>
              <Th>Link</Th>
              <Th>Issue</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Lorem</Td>
              <Td>Ipsum</Td>
              <Td>Dol</Td>
              <Td>
                <Link
                  textDecoration={"underline"}
                  color={"teal.500"}
                  href={`/nft`}
                >
                  0x123 ... 456
                </Link>
              </Td>
              <Td>
                <Button>Issue NFT</Button>
              </Td>
            </Tr>
            <Tr>
              <Td>Lorem</Td>
              <Td>Ipsum</Td>
              <Td>Dol</Td>
              <Td>
                <Link
                  textDecoration={"underline"}
                  color={"teal.500"}
                  href={`/nft`}
                >
                  0x123 ... 456
                </Link>
              </Td>
              <Td>
                <Button>Issue NFT</Button>
              </Td>
            </Tr>
            <Tr>
              <Td>Lorem</Td>
              <Td>Ipsum</Td>
              <Td>Dol</Td>
              <Td>
                <Link
                  textDecoration={"underline"}
                  color={"teal.500"}
                  href={`/nft`}
                >
                  0x123 ... 456
                </Link>
              </Td>
              <Td>
                {/* TODO: link to Issue NFT page with the correct id */}
                <Button>Issue NFT</Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

const AddNFTModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const [message, updateMessage] = useState("");
  let mintVal = [10, 20, 30];

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
  async function uploadMetadataToIPFS() {
    const { name, description, price } = formParams;
    //Make sure that none of the fields are empty
    if (!name || !description || !price || !fileURL) return;

    const nftJSON = {
      name,
      description,
      price,
      mintVal,
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
    e.preventDefault();
    try {
      updateMessage("Please wait.. uploading (upto 5 mins)");
      const metadataURL = await uploadMetadataToIPFS();

      let nftListed = await listNFT(metadataURL, formParams.price, mintVal);
      console.log(nftListed);
      let eventDetails = nftListed.receipt.events[0].args;
      let redeemDetails = {};
      for (let i in mintVal) {
        redeemDetails[mintVal[i]] = eventDetails.redeemCodes[i];
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
      <NFTTable />
    </div>
  );
}
