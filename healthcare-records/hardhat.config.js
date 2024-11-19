require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.0", // Ensure this matches the version in your Solidity contract
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Replace with your actual Ganache RPC URL if different
      chainId: 1337, // Ensure this matches the chain ID configured in Ganache
      accounts: [
      ]
    }
  }
};
