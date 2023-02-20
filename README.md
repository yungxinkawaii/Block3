# Block 3
Block 3 is a decentralized social platform designed for university students to connect, share ideas, and celebrate their academic achievements. Powered by the [Polygon zk-EVM](https://polygon.technology/solutions/polygon-zkevm/) network, our platform offers a secure and anonymous online space where students can openly discuss academic and non-academic topics, and earn NFT badges for their academic achievements.
Check out more about the project [here](https://devpost.com/software/block-3)!

## What it does
Block 3 is a social platform for university students that allows them to freely express their ideas, opinions, and interests in a secure and anonymous online space. The platform features a forum for open discussion, a Metamask wallet integration for secure transactions, and NFT badges for academic achievements. With Block 3, students can connect with their peers, celebrate their wins, and build a stronger sense of community within their university.

### Contributors
Our team consists of 3 talented developers:  
- [Shin Yung Xin](https://github.com/yungxinkawaii) - Backend Developer  
- [Lam Xin Le](https://github.com/xinle1030) - Fullstack Developer  
- [Fabian Chua](https://github.com/fabianchua6) - Frontend Developer  

## Tech Stack
The following technologies were used to build PandaBorderless: 
- [Thirdweb](https://thirdweb.com/): Web3 development framework
- [Polygon zk-EVM](https://polygon.technology/solutions/polygon-zkevm/): For deploying the smart contracts
- ERC20 Token: For user awards
- NFT badges: For user's academic achievements
- React: For the frontend framework  
- [Pinata](https://www.pinata.cloud/): For decentralised storage

# Set up guide

## To clone the project
1.  Run `git clone <url>`

## Configure Polygon zkEVM on Thirdweb
1.  Navigate to [Thirdweb Dashboard](https://nightly.thirdweb.com/dashboard)
2.  Connect to your Metamask wallet on Thirdweb.
3.  In the connected wallet tab above click on `Configure Networks`.
4.  Select the custom tab and add the details of the testnet below:
    ```
    Network Name: Polygon zkEVM testnet
    Network ID: consesnsys-zkevm
    RPC URL: https://rpc.public.zkevm-test.net
    Chain ID: 1422
    Currency symbol: ETH
    Network Type: Testnet
    ```
5.  When you're ready, click Add Network.


## Remark
Please refer to the README.md file under each directory for more set up guide.
