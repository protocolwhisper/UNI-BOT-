// Here we will fund our account with the impersonating method in hardhat
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import hre from "hardhat";
import { ERC20_ABI } from "../constants";
// Acount to impersonate have > 141WETH
export let accountImpersonated = "0xca5Fd83414Df7F712AC51f06874B71C6F8cfAc06";
export async function impersonateWhale() {
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [accountImpersonated], // <-- Whale addy
  });

  const signer = await ethers.getSigner(accountImpersonated);
  sendUsdc("0xB5a962a4b79880796781BF0F347fFDcbA9d21c41", 10, signer);
}

async function sendUsdc(
  recipient: string,
  amountInUsdc: number,
  signer: SignerWithAddress
) {
  const USDC_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

  const usdcContract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, signer);
  const decimals = 6; // USDC has 6 decimal places
  const amountInWei = ethers.utils.parseUnits(
    amountInUsdc.toString(),
    decimals
  );

  const tx = await usdcContract.transfer(recipient, amountInWei);
  const receipt = await tx.wait();

  console.log(
    `USDC transfer successful. Transaction hash: ${receipt.transactionHash}`
  );
}
