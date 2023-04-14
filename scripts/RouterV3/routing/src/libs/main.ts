// Import required dependencies
import { ethers } from "ethers";
import { Environment, CurrentConfig } from "../config";
import { getCurrencyBalance, wrapETH } from "./wallet";
import { Spinner } from "cli-spinner";
import {
  connectBrowserExtensionWallet,
  getProvider,
  getWalletAddress,
  TransactionState,
} from "./providers";
import { executeRoute, generateRoute } from "./routing";
import { SwapRoute } from "@uniswap/smart-order-router";
import { sendMailChain } from "../../../../mailchain/mailchain";
import figlet from "figlet";
const ora = require("ora");
// Helper function to wait for a given time in milliseconds
let tokenInBalance: string | undefined;
let tokenOutBalance: string | undefined;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export async function refreshBalances() {
  const provider = getProvider();
  const address = getWalletAddress();
  if (!address || !provider) {
    return;
  }

  tokenInBalance = await getCurrencyBalance(
    provider,
    address,
    CurrentConfig.tokens.in
  );
  tokenOutBalance = await getCurrencyBalance(
    provider,
    address,
    CurrentConfig.tokens.out
  );
  return [tokenInBalance, tokenOutBalance];
}

export async function main() {
  // Initialize state
  console.log(figlet.textSync("UNI-BOT"));

  let tokenInBalance: string | undefined;
  let tokenOutBalance: string | undefined;
  let txState: TransactionState = TransactionState.New;
  let blockNumber: number = 0;
  let route: SwapRoute | null = null;

  // Connect to wallet

  // Refresh balances
  async function refreshBalances() {
    const provider = getProvider();
    const address = getWalletAddress();
    if (!address || !provider) {
      return;
    }

    tokenInBalance = await getCurrencyBalance(
      provider,
      address,
      CurrentConfig.tokens.in
    );
    tokenOutBalance = await getCurrencyBalance(
      provider,
      address,
      CurrentConfig.tokens.out
    );

    console.log(
      `Token In (${CurrentConfig.tokens.in.symbol}) Balance: ${tokenInBalance}`
    );
    console.log(
      `Token Out (${CurrentConfig.tokens.out.symbol}) Balance: ${tokenOutBalance}`
    );

    return [tokenInBalance, tokenOutBalance];
  }
  // Create route
  async function createRoute() {
    const spinner = ora("Creating Route...").start();
    route = await generateRoute();
    if (route) {
      spinner.succeed("Route Created :)");
    }
  }

  // Execute swap
  async function executeSwap(route: SwapRoute | null) {
    const spinner = ora("Executing Swap...").start();
    if (!route) {
      return;
    }
    txState = TransactionState.Sending;
    txState = await executeRoute(route);
    spinner.succeed("Swap Sent...");
    //console.log(`Transaction State: ${txState}`);
  }

  // Main loop
  try {
    // Refresh balances
    const balances = ora("Loading uni-bot...").start();
    await sleep(2000);
    balances.succeed("Load completed");
    await sleep(2000);
    await refreshBalances();

    // Create route
    await sleep(2000);
    await createRoute();

    // We wrapp the eth
    const spinner = ora("Wraping 10 eth...").start();
    await sleep(2000);
    await wrapETH(10);
    spinner.succeed("Wrap Completed");
    await refreshBalances();

    // Execute swap
    if (route) {
      try {
        sleep(2000);
        let swappy = await executeSwap(route);
        console.log("💸💸 New balance 💸💸");
        const myVariable: string[] | undefined = await refreshBalances();
        if (myVariable != undefined) {
          console.log("Swap Done 🐸 ");
          sendMailChain(30, "2071");
        }
      } catch (error) {}
    }
  } catch (error) {
    console.error("Error in main loop:", error);
  }
}

main().catch((error) => {
  console.error("Error in main function:", error);
});
