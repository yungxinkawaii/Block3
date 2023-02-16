import React from "react";
import {
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NFTTable = ({ nftData }) => {

  const navigate = useNavigate();
  const toIssueNFT = (nftDetails) =>{
    console.log(nftDetails);
    navigate("/issueNFT", {
      state: nftDetails
    });
  }

  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Np.</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th isNumeric>Price</Th>
              <Th>Link</Th>
              <Th>Issue</Th>
            </Tr>
          </Thead>
          <Tbody>
            {nftData.map((data, index) => (
              <>
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{data.name}</Td>
                  <Td>{data.description}</Td>
                  <Td>{data.price}</Td>
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
                    <Button onClick={() => {toIssueNFT(data)}}>Issue NFT</Button>
                  </Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default NFTTable;
