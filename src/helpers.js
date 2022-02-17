// Library Imports
import { ethers } from 'ethers';
import { ThirdwebSDK } from "@3rdweb/sdk";
import env from "react-dotenv";

// Local Constants
import { BUNDLE_MODULE_ADDRESS } from './constants';
const walletPrivateKey = env.WALLET_PRIVATE_KEY;

if (!walletPrivateKey) {
  console.error("Wallet private key missing")
  process.exit(1)
}

export async function getBundleModule() {
  const provider = new ethers.Wallet(
    env.WALLET_PRIVATE_KEY, // Wallet private key. NEVER CHECK THE KEY IN. ALWAYS USE ENVIRONMENT VARIABLES.
    ethers.getDefaultProvider("https://winter-icy-sun.matic-testnet.quiknode.pro/f36aa318f8f806e4e15a58ab4a1b6cb9f9e9d9b9/")     // We use Polygon Mumbai network
  )
  const sdk = new ThirdwebSDK(provider);
  const module = await sdk.getBundleModule(BUNDLE_MODULE_ADDRESS);
  return module
};

export function convertBalanceHexToInt(hexNumber) {
  const balanceInt = parseInt(hexNumber, 16);
  return balanceInt
}

export function parseCardNFT(cardNFT) {
  const metadata = cardNFT.metadata
  console.log(metadata.properties);
  const card = {
    balance: convertBalanceHexToInt(cardNFT.ownedByAddress["_hex"]),
    bio: metadata.description,
    image: metadata.image,
    id: metadata.id,
    name: metadata.name, 
    properties: metadata.properties
  }
  return card
}

