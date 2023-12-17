import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/balance";
import "./tasks/send_money";
import "./tasks/users";

const config: HardhatUserConfig = {
  paths: {
    sources: "./contracts", // Path to your Solidity source files
    tests: "./test", // Path to your test files
    cache: "./cache",
    artifacts: "./artifacts", // Path to store compiled artifacts
  },

  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/2XqlXsXpIO-Y2sk4QOnaS7vUeiVK5WTe",
      accounts: [
        "9b24ff353b5b2c64d46690122776d00399b0b6b6489947e6dd371129565c03e0",
      ],
    },
  },
  solidity: "0.8.19",
  etherscan: {
    apiKey: "HGMQJEQ2FT6NZVQBP1S517C8A9PMKAXU9C",
  },
};

export default config;
