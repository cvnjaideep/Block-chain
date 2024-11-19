// Import Hardhat's ethers library
const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const HealthRecordManagement = await ethers.getContractFactory("HealthRecordManagement");

  // Deploy the contract
  const healthRecordContract = await HealthRecordManagement.deploy();
  await healthRecordContract.deployed(); // Wait for the contract to be mined

  // Log the deployed contract address
  console.log("Contract deployed to address:", healthRecordContract.address);
}

// Run the main function and catch any errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
