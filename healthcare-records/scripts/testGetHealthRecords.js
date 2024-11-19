const { ethers } = require("hardhat");

async function main() {
  // Replace with your contract address
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  
  // Replace with your contract ABI
  const contractABI = [
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

  const provider = new ethers.JsonRpcProvider("http://localhost:8545");
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  try {
    const records = await contract.getHealthRecords();
    console.log("Health Records:", records);
  } catch (error) {
    console.error("Error fetching records:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
