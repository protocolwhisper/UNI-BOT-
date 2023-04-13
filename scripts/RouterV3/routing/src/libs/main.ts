// Import required dependencies
import { ethers } from "ethers";
import { Environment, CurrentConfig } from "../config";
import { getCurrencyBalance, wrapETH } from "./wallet";
import {
  connectBrowserExtensionWallet,
  getProvider,
  getWalletAddress,
  TransactionState,
} from "./providers";
import { executeRoute, generateRoute } from "./routing";
import { SwapRoute } from "@uniswap/smart-order-router";
import { sendMailChain } from "../../../../mailchain/mailchain";

// Helper function to wait for a given time in milliseconds
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function main() {
  // Initialize state
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
    route = await generateRoute();
    console.log("Route created");
  }

  // Execute swap
  async function executeSwap(route: SwapRoute | null) {
    if (!route) {
      return;
    }
    txState = TransactionState.Sending;
    txState = await executeRoute(route);
    console.log(`Transaction State: ${txState}`);
  }

  // Main loop
  try {
    // Refresh balances
    await refreshBalances();
    // Create route
    await createRoute();

    // We wrapp the eth
    await wrapETH(100);

    refreshBalances();

    // Execute swap
    if (route) {
      console.log("Executing Swap...");
      await executeSwap(route);
      const myVariable: string[] | undefined = await refreshBalances();
      if (myVariable) {
        console.log("Swap Done");
        sendMailChain(
          myVariable[0] as string,
          myVariable[1] as string,
          "10wei"
        );
      }
    }

    // Sleep for 30 seconds before the next iteration
    await sleep(30000);
  } catch (error) {
    console.error("Error in main loop:", error);
  }
}

main().catch((error) => {
  console.error("Error in main function:", error);
});
