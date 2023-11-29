import { ethers } from "hardhat";

async function main() {
  const xikService = await ethers.deployContract("Xes");
  await xikService.waitForDeployment();

  const contractAddress = await xikService.getAddress();

  console.log(`Deployed to ${contractAddress}`);

  await xikService.userCreate("nicho");
  console.log("nicho user address: ", await xikService.getUserAddress("nicho"));
  console.log(
    "invalid user address: ",
    await xikService.getUserAddress("fgasdgadf")
  );
  const [signer] = await ethers.getSigners();

  console.log(
    "NICHO BALANCE: ",
    await ethers.provider.getBalance(signer.address)
  );

  await signer.sendTransaction({
    to: contractAddress,
    value: ethers.parseEther("1000"),
    data: xikService.interface.encodeFunctionData("fundMe", [
      ethers.parseEther("1000"),
    ]),
  });

  console.log(
    "NICHO BALANCE: ",
    await ethers.provider.getBalance(signer.address)
  );

  await xikService.withdrawFundMe();

  console.log(
    "NICHO BALANCE: ",
    await ethers.provider.getBalance(signer.address)
  );

  // console.log(await xikService.users("nicho"));

  // await xikService.send("nicho", 50);

  // await signer.sendTransaction({
  //   to: contractAddress,
  //   value: 50,
  //   data: xikService.interface.encodeFunctionData("send", ["nicho", 50]),
  // });

  // console.log(
  //   "NICHO BALANCE: ",
  //   await ethers.provider.getBalance(await xikService.getUserAddress("nicho"))
  // );

  // console.log(await xikService.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
