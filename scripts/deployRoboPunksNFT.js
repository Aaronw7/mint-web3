const hre = require("hardhat");

async function main() {
  // const RoboPunksNFT = await hre.ethers.getContractFactory("RoboPunksNFT");
  // const roboPunksNFT = await RoboPunksNFT.deploy();

  // await roboPunksNFT.deployed();

  // console.log("RoboPunksNFT deployed to:", roboPunksNFT.address);

  const roboPunksNFT = await hre.ethers.deployContract("RoboPunksNFT");
  await roboPunksNFT.waitForDeployment();

  console.log("Deploying...");
  console.log(`Deployed contract to ${await roboPunksNFT.getAddress() }`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
});