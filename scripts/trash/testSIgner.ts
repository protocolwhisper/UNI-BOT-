import { ethers } from "hardhat";
import hre from "hardhat";
export async function getLocalSigner() {
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: ["0x863f9d7b75f764b683fc1e59cae569d699b556cf"],
  });
  const signer = await ethers.getSigner(
    "0x863F9D7B75F764b683fC1E59Cae569D699B556CF"
  );

  return signer;
}
