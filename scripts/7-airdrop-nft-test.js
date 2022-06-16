import sdk from "./1-initialize-sdk.js";

// This is the address to our ERC-1155 membership NFT contract.
const contract = sdk.getEditionDrop(
  "0xF39C6Fa1D6cBE05De22f5eE8a6eB63Af834750Dd",
);

const addresses = [
  "0x0FeF592988529Fd2dcdbE9ef6fBf3Bb6A0A21066",
  "0x01ab57945AA1dFb9444dD0e2611Cf0C7Ff97caf1",
];

const tokenId = "0";

(async () => {
  try {    
    // Call transferBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...")
    await contract.airdrop(tokenId, addresses);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();