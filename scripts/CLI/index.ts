import { Command } from "commander";
import ora from "ora";
import { trackGasPrice } from "../gastracker/gasTracker.js";
const program = new Command();

async function mainFunction() {
  const spinner = ora("Executing main function...").start();
  try {
    // Your main function logic goes here
    // For example, you can simulate a delay using a setTimeout function
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    await trackGasPrice(10);

    spinner.succeed("Main function executed successfully.");
  } catch (error) {
    spinner.fail("Main function execution failed.");
    console.error(error);
  }
}

// Set up the commander program
program
  .version("0.0.1")
  .description(
    "A CLI tool that executes a main function with a loading spinner."
  )
  .action(mainFunction);

// Parse the command-line arguments and execute the corresponding action
program.parse(process.argv);
