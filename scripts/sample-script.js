// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  const MintExample = await hre.ethers.getContractFactory("MintExample");
  const mintExample = await MintExample.deploy("Minter", "MINTSYMBOL");

  await mintExample.deployed();

  console.log("MintExample deployed to:", mintExample.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
