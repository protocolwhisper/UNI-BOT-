import { Token } from "@uniswap/sdk-core";
import { WETH_TOKEN, USDC_TOKEN } from "./constants";

// Sets if the example should run locally or on chain
export enum Environment {
  LOCAL,
  WALLET_EXTENSION,
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
  };
}

// Example Configuration

export const CurrentConfig: ExampleConfig = {
  env: Environment.LOCAL,
  rpc: {
    local: "http://localhost:8545",
    mainnet: "",
  },
  wallet: {
    address: "0xB5a962a4b79880796781BF0F347fFDcbA9d21c41",
    privateKey: "",
  },
  tokens: {
    in: WETH_TOKEN,
    amountIn: 1,
    out: USDC_TOKEN,
  },
};
