import { computePoolAddress } from "@uniswap/v3-sdk";
import { POOL_FACTORY_CONTRACT_ADDRESS } from "./constants";
import { CurrentConfig } from "../config";
import { abi } from "./abi";
import { QUOTER_CONTRACT_ADDRESS } from "./constants";
import * as Quoter from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import { ethers } from "hardhat";
import { fromReadableAmount, toReadableAmount } from "./conversions";
import * as dotenv from "dotenv";
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { getLocalSigner } from "./testSIgner";
import { ethers as eth } from "ethers";
import { getProvider } from "./providers";
dotenv.config();

//Compute the Pool's deployment Address
const currentPoolAddress = computePoolAddress({
  factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
  tokenA: CurrentConfig.tokens.in,
  tokenB: CurrentConfig.tokens.out,
  fee: CurrentConfig.tokens.poolFee,
});
//Initiate the Contract
async function getQuote() {
  //Maybe later we will ned an argument
  //const provider = new ethers.providers.JsonRpcProvider(process.env.LOCAL_NODE); // We can fix where it takes the RPC

  console.log(currentPoolAddress);
  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    getProvider()
  );
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);
  console.log(token0);
  // console.log(token1);
  // console.log(fee);
  const quoterContract = new eth.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    getProvider()
  );

  const signer = await getLocalSigner();
  //let signer = await getLocalSigner();
  const quotedAmountOut = await quoterContract
    .connect(signer)
    .quoteExactInputSingle(
      token1,
      token0,
      fee,
      fromReadableAmount(
        CurrentConfig.tokens.amountIn,
        CurrentConfig.tokens.in.decimals
      ).toString(), // This gives me an BigInt
      0
    );

  return toReadableAmount(quotedAmountOut, CurrentConfig.tokens.out.decimals);
}

getQuote();
