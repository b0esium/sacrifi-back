const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

// from hardhat-deploy plugin
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    //@ TODO: get correct address
    console.log("Deploying contracts with the account:", deployer)

    const { deploy } = deployments
    const args = []

    const contract = await deploy("Sacrifi", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: developmentChains.includes(network.name)
            ? 1
            : network.config.blockConfirmations,
    })

    // verify contract
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(contract.address, args)
    }
}

module.exports.tags = ["all", "sacrifi"]
