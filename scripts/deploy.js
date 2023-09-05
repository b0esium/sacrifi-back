const hre = require("hardhat")

async function main() {
    const sacrifi = await hre.ethers.deployContract("Sacrifi")

    await sacrifi.waitForDeployment()

    console.log(`sacrifi deployed to ${sacrifi.target}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
