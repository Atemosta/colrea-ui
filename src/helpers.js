// Library Imports
import { ethers } from 'ethers';
import { ThirdwebSDK } from "@3rdweb/sdk";
import env from "react-dotenv";

// Local Constants
const BUNDLE_MODULE_ADDRESS = '0xB841A090953ecC78D17CAaDA2f04427928A0ac29';
const walletPrivateKey = env.WALLET_PRIVATE_KEY;

if (!walletPrivateKey) {
  console.error("Wallet private key missing")
  process.exit(1)
}

export async function getBundleModule() {
  // You can switch out this provider with any wallet or provider setup you like.
  const provider = new ethers.Wallet(
    // Wallet private key. NEVER CHECK THE KEY IN. ALWAYS USE ENVIRONMENT VARIABLES.
    env.WALLET_PRIVATE_KEY,
    // We use Polygon Mumbai network
    ethers.getDefaultProvider("https://winter-icy-sun.matic-testnet.quiknode.pro/f36aa318f8f806e4e15a58ab4a1b6cb9f9e9d9b9/")
  )
  const sdk = new ThirdwebSDK(provider);
  const module = await sdk.getBundleModule(BUNDLE_MODULE_ADDRESS);
  return module
};

