// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract UserProfile {
    struct Profile {
        string name;
        address walletAddress;
        string bio;
        string image;
        uint256 creationDate;
        address[] ownedNFTs;
    }

    mapping(address => Profile) public profiles;

    function createProfile(
        string memory _name,
        string memory _bio,
        string memory _image
    ) public {
        require(
            bytes(profiles[msg.sender].name).length == 0,
            "Profile already exists."
        );
        profiles[msg.sender].name = _name;
        profiles[msg.sender].walletAddress = msg.sender;
        profiles[msg.sender].bio = _bio;
        profiles[msg.sender].image = _image;
        profiles[msg.sender].creationDate = block.timestamp;
    }

    function updateProfile(
        string memory _name,
        string memory _bio,
        string memory _image
    ) public {
        require(
            bytes(profiles[msg.sender].name).length > 0,
            "Profile does not exist."
        );
        profiles[msg.sender].name = _name;
        profiles[msg.sender].bio = _bio;
        profiles[msg.sender].image = _image;
    }

    function addNFT(address _nftAddress) public {
        require(
            bytes(profiles[msg.sender].name).length > 0,
            "Profile does not exist."
        );
        profiles[msg.sender].ownedNFTs.push(_nftAddress);
    }

    function removeNFT(address _nftAddress) public {
        require(
            bytes(profiles[msg.sender].name).length > 0,
            "Profile does not exist."
        );
        uint256 idx = profiles[msg.sender].ownedNFTs.length;
        while (idx-- > 0) {
            if (profiles[msg.sender].ownedNFTs[idx] == _nftAddress) {
                profiles[msg.sender].ownedNFTs[idx] = profiles[msg.sender]
                    .ownedNFTs[profiles[msg.sender].ownedNFTs.length - 1];
                profiles[msg.sender].ownedNFTs.pop();
                return;
            }
        }
    }

    function getProfile(
        address _walletAddress
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            address[] memory,
            uint256
        )
    {
        return (
            profiles[_walletAddress].name,
            profiles[_walletAddress].bio,
            profiles[_walletAddress].image,
            profiles[_walletAddress].ownedNFTs,
            profiles[_walletAddress].creationDate
        );
    }
}
