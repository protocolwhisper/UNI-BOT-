import axios, { AxiosResponse } from "axios";
import { load } from "ts-dotenv";
import { sendMailChain } from "../mailchain/mailchain";
import { main } from "../RouterV3/routing/src/libs/main";
import { refreshBalances } from "../RouterV3/routing/src/libs/main";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const env = load({
  ETHERSCAN_API_KEY: String,
  GAS_TARGET: Number,
});
interface GasPriceResult {
  gasPrice?: number;
  error?: string;
}

interface EtherscanResponse {
  result: string | null;
}

async function fetchGasPrice(): Promise<GasPriceResult> {
  try {
    const response: AxiosResponse<EtherscanResponse> = await axios.get(
      env.ETHERSCAN_API_KEY
    );

    const { result } = response.data;

    if (result) {
      const gasPrice = parseInt(result, 16) / 1e9; // Convert from wei to gwei
      return { gasPrice };
    } else {
      throw new Error("Failed to fetch gas price");
    }
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch gas price" };
  }
}
export async function trackGasPrice(gastarget: number): Promise<number> {
  // Loop until the gas price is less than or equal to the gas target
  while (true) {
    const data = await fetchGasPrice();
    if (data.gasPrice !== undefined) {
      if (data.gasPrice <= gastarget) {
        // Executes the trading function
        await main();
        let balanceout = await refreshBalances();
        if (balanceout != undefined) {
          sendMailChain(data.gasPrice, balanceout[1]);
          return 0;
        } else {
          // Handle the case when balanceout is undefined, if necessary
          return 1; // Return a number or any meaningful value as per your use case
        }
      }
    } else {
      // Add an appropriate default return value or handle the error for when data.gasPrice is undefined
      throw new Error("Gas price is undefined");
    }
  }
}

// Call trackGasPrice with the desired gas target
trackGasPrice(env.GAS_TARGET);
