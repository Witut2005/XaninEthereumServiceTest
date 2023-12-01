import { task } from "hardhat/config";

export const balance = task("balance")
  .addParam("address", "The first parameter")
  .setAction(async (args, hre) => {
    console.log(`contract address: ${args.address}`);
    console.log(
      `balance ${await hre.ethers.provider.getBalance(args.address)}`
    );
  });
