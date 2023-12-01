import { task } from "hardhat/config";

export const balance = task("send_money")
  .addParam("address", "address of contract")
  .addParam("amount", "amount to send")
  .setAction(async (args, hre) => {
    console.log(`contract address: ${args.address}`);
    const [signer] = await hre.ethers.getSigners();
    const xikService = await hre.ethers.getContractFactory("Xes");

    signer
      .sendTransaction({
        to: args.address,
        value: hre.ethers.parseEther("1000"),
        data: xikService.interface.encodeFunctionData("fundMe", [
          hre.ethers.parseEther(args.amount),
        ]),
      })
      .then(() => {
        console.log("Babciu hajsik wlecial B))");
      })
      .catch(() => {
        console.log("Babciu hajsik nie wlecial B(((");
      });
  });
