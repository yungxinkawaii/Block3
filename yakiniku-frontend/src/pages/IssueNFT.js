import React, { useState } from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Tag,
  useColorModeValue,
  Button,
  NumberInput,
  NumberInputField,
  Stack,
  Flex,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNftMarketplaceContext } from "../context/nftMarketplace";
import { makeIndexArr, flatten } from "../utils/arr_process";

const Tags = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

const MintInputGroup = ({
  id,
  mintValue,
  emails,
  onMintValueChange,
  onEmailsChange,
  onRemove,
}) => {
  return (
    <>
      <Flex w="100%">
        <NumberInput
          w="25%"
          mr="2"
          value={mintValue}
          onChange={onMintValueChange}
        >
          <NumberInputField placeholder="Mint value" />
        </NumberInput>
        <Input
          w="70%"
          placeholder="Input email(s) separated by ','"
          mr="2"
          value={emails}
          onChange={onEmailsChange}
        />
        <IconButton
          colorScheme={"red"}
          onClick={onRemove}
          icon={<DeleteIcon />}
        />
      </Flex>
    </>
  );
};

export default function IssueNFT() {
  const [groups, setGroups] = useState([]);
  const location = useLocation();
  const nftDetails = location.state;
  const metadataURL = nftDetails.metadataURL;
  const tokenId = nftDetails.tokenId;
  const mintVal = nftDetails.mintVal;
  const redeemCodes = nftDetails.redeemCodes;

  console.log(nftDetails);

  const { issueNFT } = useNftMarketplaceContext();

  const handleAddGroup = () => {
    if (groups.length < 3) {
      const newGroup = { id: groups.length + 1, mintValue: "", emails: "" };
      setGroups([...groups, newGroup]);
    }
  };

  const handleRemoveGroup = (id) => {
    const updatedGroups = groups.filter((group) => group.id !== id);
    setGroups(updatedGroups);
  };

  const handleMintValueChange = (id, value) => {
    const updatedGroups = groups.map((group) => {
      if (group.id === id) {
        return { ...group, mintValue: value };
      }
      return group;
    });
    setGroups(updatedGroups);
  };

  const handleEmailsChange = (id, event) => {
    const value = event.target.value;
    const updatedGroups = groups.map((group) => {
      if (group.id === id) {
        return { ...group, emails: value };
      }
      return group;
    });
    setGroups(updatedGroups);
  };

  const callIssueNFT = async () => {
    let mintValArr = groups.map((group) => parseInt(group.mintValue));
    console.log(mintValArr);

    // let mintValArr = [10, 20, 30];
    let connectedAddresses = [
      ["0x1e84F443fB8f0D9DC868F95d8f675a706a9268AF"],
      ["0x6b4F51E7A637bd008C1E0213441380cd1f562144"],
      ["0xC42a639837f8b3F941812FdDa3F112701334d4Cd"],
    ];

    let idxArr = makeIndexArr(connectedAddresses);
    let addresses = flatten(connectedAddresses);
    console.log(addresses);

    let transaction = await issueNFT(tokenId, addresses, idxArr, mintValArr);
    console.log(transaction);

    let redeemDetails = transaction.receipt.events[0].args;
    console.log(redeemDetails.mintVal);
    console.log(redeemDetails.redeemCodes);
  };

  return (
    <>
      <Heading as="h1">Issue NFT </Heading>
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flex="1"
          marginRight="4"
          position="relative"
          alignItems="center"
        >
          <Box
            width={{ base: "100%", sm: "85%" }}
            zIndex="2"
            marginLeft={{ base: "0", sm: "5%" }}
            marginTop="5%"
          >
            <Image
              borderRadius="lg"
              src={nftDetails.image}
              objectFit="contain"
            />
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                "radial(primary.600 1px, transparent 1px)",
                "radial(secondary.300 1px, transparent 1px)"
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
        >
          <Tags tags={["School", "Award"]} />
          <Heading marginTop="1">
            {nftDetails.tokenId} - {nftDetails.name}
          </Heading>
          <Text fontWeight={400} fontSize={"xl"} mt="2">
            {/* 0.3426798 ETH */}
          </Text>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
          >
            {/* this is a description of a school NFT that is given to all dean listers */}
            {nftDetails.description}
          </Text>
          <Text fontWeight="medium" mt="2">
            Owned by: {nftDetails.seller}
          </Text>

          <Stack spacing={4} my="2">
            {groups.map((group) => (
              <MintInputGroup
                key={group.id}
                id={group.id}
                mintValue={group.mintValue}
                emails={group.emails}
                onMintValueChange={(value) =>
                  handleMintValueChange(group.id, value)
                }
                onEmailsChange={(value) => handleEmailsChange(group.id, value)}
                onRemove={() => handleRemoveGroup(group.id)}
              />
            ))}
            <Button
              w="full"
              variant="outline"
              colorScheme="secondary"
              onClick={handleAddGroup}
            >
              Add Mint Input Group
            </Button>
          </Stack>
          <Button w="full" colorScheme={"primary"} onClick={callIssueNFT}>
            Issue NFT
          </Button>
        </Box>
      </Box>
    </>
  );
}
