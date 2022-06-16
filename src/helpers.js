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

export function getEditionDropContract() {
  console.log("wpk: " + walletPrivateKey )
  const sdk = ThirdwebSDK.fromPrivateKey(
    walletPrivateKey, // privateKey
    "mumbai" // network
  );  
  const contract = sdk.getEditionDrop(EDITION_DROP_ADDRESS);
  return contract; 
};

export function convertBalanceHexToInt(hexNumber) {
  const balanceInt = parseInt(hexNumber, 16);
  return balanceInt
}

export function parseRawNFT(nftRaw) {
  const metadata = nftRaw.metadata
  const nft = {
    balance: convertBalanceHexToInt(nftRaw.quantityOwned["_hex"]),
    bio: metadata.description,
    image: metadata.image,
    id: metadata.id,
    name: metadata.name, 
    properties: metadata.properties
  }
  return nft;
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

