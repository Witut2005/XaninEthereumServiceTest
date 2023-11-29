import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

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
  },
  solidity: "0.8.19",
  etherscan: {
    apiKey: "HGMQJEQ2FT6NZVQBP1S517C8A9PMKAXU9C",
  },
};

export default config;
