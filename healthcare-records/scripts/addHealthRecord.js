const { ethers } = require("hardhat");

const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_patientName", "type": "string" },
      { "internalType": "string", "name": "_gender", "type": "string" },
      { "internalType": "string", "name": "_diagnosedDisease", "type": "string" },
      { "internalType": "string", "name": "_treatment", "type": "string" },
      { "internalType": "string", "name": "_visitDate", "type": "string" },
      { "internalType": "string", "name": "_nextVisitDate", "type": "string" }
    ],
    "name": "addHealthRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getHealthRecords",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "patientName", "type": "string" },
          { "internalType": "string", "name": "gender", "type": "string" },
          { "internalType": "string", "name": "diagnosedDisease", "type": "string" },
          { "internalType": "string", "name": "treatment", "type": "string" },
          { "internalType": "string", "name": "visitDate", "type": "string" },
          { "internalType": "string", "name": "nextVisitDate", "type": "string" }
        ],
        "internalType": "struct HealthRecordManagement.HealthRecord[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

async function main() {
  const [deployer] = await ethers.getSigners();
  const contract = new ethers.Contract(contractAddress, contractABI, deployer);

  try {
    console.log("Adding a health record...");
    const tx = await contract.addHealthRecord(
      "John Doe",
      "Male",
      "Flu",
      "Rest and hydration",
      "2024-11-09",
      "2024-11-16"
    );

    console.log("Transaction sent. Waiting for confirmation...");
    await tx.wait();
    console.log("Transaction confirmed! Health record added successfully.");
  } catch (error) {
    console.error("Error adding health record:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
