import * as dotenv from "dotenv";
dotenv.config();

const rpc = process.env.LOCAL_NODE as String;

console.log(rpc);
