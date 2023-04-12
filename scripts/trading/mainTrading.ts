import { createTrade, executeTrade, TokenTrade } from "./trade";
import { impersonateWhale } from "./Funding";
async function main() {
  impersonateWhale();
  try {
    console.log("Hello Here");

    // Creating trade
    const trade: TokenTrade = await createTrade();
    console.log(trade);

    try {
      // Executing trade
      const result = await executeTrade(trade);
      console.log("Trade executed successfully:", result);
    } catch (executionError) {
      console.error("Error executing trade:", executionError);
    }
  } catch (creationError) {
    console.error("Error creating trade:", creationError);
  }
}

main();
