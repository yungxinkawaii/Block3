// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract UserProfile {
    struct Profile {
        string name;
        string email;
        address walletAddress;
        string bio;
        string image;
        uint256 creationDate;
    }

    mapping(address => Profile) public profiles;
    mapping(string => address) private emailToAddr;

    function createProfile(
        string memory _name,
        string memory _bio,
        string memory _image,
        string memory email
    ) public {
        require(
            bytes(profiles[msg.sender].name).length == 0,
            "Profile already exists."
        );
        profiles[msg.sender].name = _name;
        profiles[msg.sender].email = email;
        profiles[msg.sender].walletAddress = msg.sender;
        profiles[msg.sender].bio = _bio;
        profiles[msg.sender].image = _image;
        profiles[msg.sender].creationDate = block.timestamp;
        emailToAddr[email] = msg.sender;
    }

    function getAddrByEmail(string memory _email) public view returns(address){
        return emailToAddr[_email];
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

    function getProfile(
        address _walletAddress
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        return (
            profiles[_walletAddress].name,
            profiles[_walletAddress].bio,
            profiles[_walletAddress].image,
            profiles[_walletAddress].creationDate
        );
    }
}
