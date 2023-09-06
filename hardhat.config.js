require("@nomicfoundation/hardhat-toolbox")

// const MAINNET_RPC_URL =
//     process.env.ALCHEMY_MAINNET_RPC_URL
// const SEPOLIA_RPC_URL =
//     process.env.SEPOLIA_RPC_URL

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
        // sepolia: {
        //     url: SEPOLIA_RPC_URL,
        //     saveDeployments: true,
        //     chainId: 11155111,
        //     blockConfirmations: 6,
        // },
        // mainnet: {
        //     url: MAINNET_RPC_URL,
        //     saveDeployments: true,
        //     chainId: 1,
        //     blockConfirmations: 6,
        // },
    },
}
