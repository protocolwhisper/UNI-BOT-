import { Token } from "@uniswap/sdk-core";
import { FeeAmount } from "@uniswap/v3-sdk";
import { load } from "ts-dotenv";
//import { USDC_TOKEN, WETH_TOKEN } from "./trash/constants";
import { TOKEN_IN, TOKEN_OUT } from "./constants";
import { ethers } from "ethers";
const env = load({
  POOL_FEE: String,
  PRIVATE_KEY: String,
});
// Sets if the example should run locally or on chain
export enum Environment {
  LOCAL,
  MAINNET,
}

// Inputs that configure this example to run
export interface ExampleConfig {
  env: Environment;
  rpc: {
    local: string;
    mainnet: string;
  };
  wallet: {
    address: string;
    privateKey: string;
  };
  tokens: {
    in: Token;
    amountIn: number;
    out: Token;
    poolFee: number;
  };
}

//Get Pool Fee from user
const poolFee: FeeAmount = (() => {
  switch (env.POOL_FEE) {
    case "LOW":
      return FeeAmount.LOW;
    case "MEDIUM":
      return FeeAmount.MEDIUM;
    case "HIGH":
      return FeeAmount.HIGH;
    default:
      throw new Error("Invalid pool fee environment variable value");
  }
})();

// Example Configuration
function privateKeyToPublicKey() {
  // Create a new Wallet instance using the private key
  const wallet = new ethers.Wallet(env.PRIVATE_KEY);

  // Return the public key (in hex format) of the wallet
  return wallet.publicKey;
}

export const CurrentConfig: ExampleConfig = {
  env: Environment.LOCAL,
  rpc: {
    local: "http://localhost:8545",
    mainnet: "http://localhost:8545",
  },
  wallet: {
    address: privateKeyToPublicKey(), // Just getting the address with Ethers
    privateKey: env.PRIVATE_KEY, // Fix Wallet Handle
  },
  tokens: {
    in: TOKEN_IN,
    amountIn: 1,
    out: TOKEN_OUT,
    poolFee: poolFee,
  },
};
