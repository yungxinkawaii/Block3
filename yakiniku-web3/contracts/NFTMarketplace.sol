//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import './RWDToken.sol';

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage {

    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _tokenIds;
    //Keeps track of the number of items sold on the marketplace
    Counters.Counter private _itemsSold;
    //owner is the contract address that created the smart contract
    address owner;
    //The fee charged by the marketplace to be allowed to list an NFT
    uint256 listPrice = 0.01 ether;
    RWDToken public rwdToken;

    //The structure to store info about a listed token
    struct ListedToken {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyListed;
    }

    struct MintToken {
        uint256 tokenId;
        uint256 mintValue;
    }

    //The structure to store info mountabout a nft owner for a nft
    struct NFTRedeemState {
        uint issueDate;
        uint256 mintValue;
        bool hasRedeemed;
    }

    //the event emitted when a token is successfully listed
    event TokenListedSuccess (
        uint256 indexed tokenId,
        address owner,
        address seller,
        uint256 price,
        bool currentlyListed,
        uint256[] mintVal,
        uint32[] redeemCodes
    );

    event NFTRedeemed(address user, uint256 tokenId, uint32 redeemCode, uint256 mintValue, uint256 redeemStatesLen, uint256 oldBalance, uint256 newBalance);

    //tokenId to NFT
    mapping(uint256 => ListedToken) private idToListedToken;

    // redeem code to mint token
    mapping(uint32 => MintToken) private codeToMintToken;

    //NFTOwners to NFT to NFT Redeem State
    mapping (address => mapping(uint256 => NFTRedeemState[])) public nftOwners;

    constructor(RWDToken _rwdToken) ERC721("NFTMarketplace", "NFTM") {
        owner = msg.sender;
        rwdToken = _rwdToken;
    }

    function updateListPrice(uint256 _listPrice) public {
        require(owner == msg.sender, "Only owner can update listing price");
        listPrice = _listPrice;
    }

    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    function getLatestIdToListedToken() public view returns (ListedToken memory) {
        uint256 currentTokenId = _tokenIds.current();
        return idToListedToken[currentTokenId];
    }

    function getListedTokenForId(uint256 tokenId) public view returns (ListedToken memory) {
        return idToListedToken[tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }

    //The first time a token is created, it is listed here
    function createToken(string memory tokenURI, uint256 price, uint256[] memory mintVal) public payable returns (uint) {
        //Increment the tokenId counter, which is keeping track of the number of minted NFTs
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        //Mint the NFT with tokenId newTokenId to the address who called createToken
        _safeMint(msg.sender, newTokenId);

        //Map the tokenId to the tokenURI (which is an IPFS URL with the NFT metadata)
        _setTokenURI(newTokenId, tokenURI);

        //Helper function to update Global variables and emit an event
        createListedToken(newTokenId, price, mintVal);

        return newTokenId;
    }

    function createListedToken(uint256 tokenId, uint256 price, uint256[] memory mintVal) private {
        //Make sure the sender sent enough ETH to pay for listing
        require(msg.value == listPrice, "Hopefully sending the correct price");
        //Just sanity check
        require(price > 0, "Make sure the price isn't negative");

        /* Generate Random String Coupon code */
        uint32[] memory redeemCodes = new uint32[](mintVal.length);
        for(uint i = 0; i < mintVal.length; i++)
        {
            uint32 code = uint32(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, tokenId, mintVal[i])))%2000000000);
            codeToMintToken[code] = MintToken({
                tokenId: tokenId,
                mintValue: mintVal[i]
            });
            redeemCodes[i] = code;
        }

        //Update the mapping of tokenId's to Token details, useful for retrieval functions
        idToListedToken[tokenId] = ListedToken({
            tokenId: tokenId,
            owner: payable(address(this)),
            seller: payable(msg.sender),
            price: price,
            currentlyListed: true
        });

        nftOwners[msg.sender][tokenId].push(NFTRedeemState({
                issueDate: block.timestamp, 
                mintValue:0, 
                hasRedeemed: true
                }));

        _transfer(msg.sender, address(this), tokenId);
        //Emit the event for successful transfer. The frontend parses this message and updates the end user
        emit TokenListedSuccess(
            tokenId,
            address(this),
            msg.sender,
            price,
            true,
            mintVal,
            redeemCodes
        );
    }
    
    //This will return all the NFTs currently listed to be sold on the marketplace
    function getAllNFTs() public view returns (ListedToken[] memory) {
        uint nftCount = _tokenIds.current();
        ListedToken[] memory tokens = new ListedToken[](nftCount);
        uint currentIndex = 0;
        uint currentId;
        //at the moment currentlyListed is true for all, if it becomes false in the future we will 
        //filter out currentlyListed == false over here
        for(uint i = 0; i < nftCount; i++)
        {
            currentId = i + 1;
            ListedToken storage currentItem = idToListedToken[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return tokens;
    }
    
    //Returns all the NFTs that the current user is owner or seller in
    function getMyNFTs() public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        //Important to get a count of all the NFTs that belong to the user before we can make an array for them
        for(uint i=0; i < totalItemCount; i++)
        {
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].seller == msg.sender || (checkWalletNFT(i + 1) && getFirstOccuringRedeemState(i+1))){
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        ListedToken[] memory items = new ListedToken[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].seller == msg.sender || (checkWalletNFT(i + 1) && getFirstOccuringRedeemState(i+1))){
                currentId = i+1;
                ListedToken storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function getRedeemStatesLen(uint256 tokenId) private view returns (uint256){
        uint256 redeemStatesLen = (nftOwners[msg.sender][tokenId]).length;
        return redeemStatesLen;
    }

    function getFirstOccuringRedeemState(uint256 tokenId) private view returns (bool){
        NFTRedeemState[] memory redeemStates = nftOwners[msg.sender][tokenId];
        for (uint256 i = 0; i < redeemStates.length; i++){
            if (redeemStates[i].hasRedeemed){
                return true;
            }
        }
        return false;
    }

    function getLastRedeemState(uint256 tokenId) private view returns (NFTRedeemState memory){
        NFTRedeemState[] memory redeemStates = nftOwners[msg.sender][tokenId];
        return redeemStates[getRedeemStatesLen(tokenId) - 1];
    }

    function issueNFT(uint256 tokenId, address[] memory walletAddr) public{
        for (uint i = 0; i < walletAddr.length; i++){
            nftOwners[walletAddr[i]][tokenId].push(NFTRedeemState({
                    issueDate: block.timestamp, 
                    mintValue: 0, 
                    hasRedeemed: false
                    }));
        }
    }

    function redeemNFT(uint256 tokenId, uint32 redeemCode) public{
        require(codeToMintToken[redeemCode].tokenId == tokenId, "1. Invalid Redeem Code for NFT");
        require(checkWalletNFT(tokenId) && !((getLastRedeemState(tokenId)).hasRedeemed), "2. Invalid Redeem Code for NFT");

        uint256 mintValue = codeToMintToken[redeemCode].mintValue;
        uint256 redeemStatesLen = (nftOwners[msg.sender][tokenId]).length;
        nftOwners[msg.sender][tokenId][redeemStatesLen - 1].mintValue = mintValue;
        nftOwners[msg.sender][tokenId][redeemStatesLen - 1].hasRedeemed = true;

        uint256 oldBalance = rwdToken.balanceOf(msg.sender);
        rwdToken.transfer(msg.sender, mintValue);
        uint256 newBalance = rwdToken.balanceOf(msg.sender);

        emit NFTRedeemed(msg.sender, tokenId, redeemCode, mintValue, redeemStatesLen, oldBalance, newBalance);
    }

    function checkWalletNFT(uint256 tokenId) public view returns (bool) {
        return (nftOwners[msg.sender][tokenId]).length > 0;
    }
}