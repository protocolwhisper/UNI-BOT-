import axios, { AxiosResponse } from "axios";
import { executeQuote } from "../quoting/quote";
import { load } from "ts-dotenv";

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

function trackGasPrice(gastarget: number) {
  // Let's configure the gas variable from the enviroment variable
  fetchGasPrice().then((data) => {
    console.log("Current Ethereum gas price:", data);
    if (data.gasPrice !== undefined) {
      if (data.gasPrice >= env.GAS_TARGET) {
        // Executes the trading function
        executeQuote();
      }
      console.log(typeof data.gasPrice);
    }
  });
}

// Call trackGasPrice every second (1000 milliseconds)
setInterval(() => trackGasPrice(env.GAS_TARGET), 1000);
