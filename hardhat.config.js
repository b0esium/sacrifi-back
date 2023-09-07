require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-verify")
require("hardhat-deploy")
require("dotenv").config()

// const MAINNET_RPC_URL =
//     process.env.MAINNET_RPC_URL
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.19",
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // // If you want to do some forking, uncomment this
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
            chainId: 1337,
        },
        localhost: {
            chainId: 1337,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            chainId: 11155111,
            accounts: [SEPOLIA_PRIVATE_KEY],
            saveDeployments: true,
            blockConfirmations: 6,
        },
        // mainnet: {
        //     url: MAINNET_RPC_URL,
        //     saveDeployments: true,
        //     chainId: 1,
        //     blockConfirmations: 6,
        // },
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        player: {
            default: 1,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
}
