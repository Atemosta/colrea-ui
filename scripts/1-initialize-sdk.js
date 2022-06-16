// import { ethers } from "ethers";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

//Importing and configuring our .env file that we use to securely store our environment variables
import dotenv from "dotenv";
dotenv.config();

// Some quick checks to make sure our .env is working.
if (!process.env.WALLET_PRIVATE_KEY || process.env.WALLET_PRIVATE_KEY === "") {
  console.log("🛑 Private key not found.")
}

// get an instance of the SDK with the signer already setup
const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.WALLET_PRIVATE_KEY, // privateKey
  "mumbai" // network
);

// We are exporting the initialized thirdweb SDK so that we can use it in our other scripts
export default sdk;