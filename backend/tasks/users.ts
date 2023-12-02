import { task } from "hardhat/config";
import { Xes__factory } from "../typechain-types";

export const balance = task("users", "gets all users defined within service")
  .addParam("address", "address of XaninEthereumService smart contract :,)")
  .setAction(async (args, hre) => {
    console.log(`contract address: ${args.address}`);

    const xaninEthereumService = await Xes__factory.connect(
      args.address,
      hre.ethers.provider
    );

    // await xaninEthereumService.userCreate("fasdfa");

    await console.log(
      `users: ${await xaninEthereumService.getKeys()}`
      //   `users ${await signer.sendTransaction({
      //     to: args.address,
      //     value: hre.ethers.parseEther("0.0001"),
      //     data: xaninEthereumService.interface.encodeFunctionData("keys()", []),
      //   })}`
    );
  });
