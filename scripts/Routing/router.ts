import { generateRoute, executeRoute } from "./routing";
import { fundMe } from "./funding";
async function main() {
  //First we will Fund our account
  fundMe;
  try {
    generateRoute;
    console.log("Route has been created :) ");
    try {
      // Executing Route
      executeRoute;
    } catch (executionError) {
      console.error("Error executing Route:", executionError);
    }
  } catch (creationError) {
    console.error("Error creating Route:", creationError);
  }
}

main();
