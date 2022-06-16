// Bypass
// @ts-ignore
import { Buffer as NodeBuffer } from 'buffer';

// Library Imports
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import env from "react-dotenv";

// Local Constants
import { EDITION_DROP_ADDRESS } from './constants';
const walletPrivateKey = env.WALLET_PRIVATE_KEY;

if (!walletPrivateKey) {
  console.error("Wallet private key missing")
  process.exit(1)
}

window.Buffer = window.Buffer || NodeBuffer;


export async function getEditionDropContract() {
  const sdk = new ThirdwebSDK("rinkeby");
  const contract = sdk.getEditionDrop(EDITION_DROP_ADDRESS);
  return contract; 
};

export function convertBalanceHexToInt(hexNumber) {
  const balanceInt = parseInt(hexNumber, 16);
  return balanceInt
}

export function parseCardNFT(cardNFT) {
  const metadata = cardNFT.metadata
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

export function checkIfPropertyExists(name, properties) {
  if (properties) {
    if (name in properties){
      return properties[name]
    } 
  }
  else {
    return false
  }
}

