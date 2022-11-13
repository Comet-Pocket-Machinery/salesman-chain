const API_KEY = "0zK3ljg6yvA4BNNMVVa8ubI3vQkhCYeo";
const CONTRACT_ADDRESS = "0x91e7239e341f18543999ff0d16aAdBc6D27d301B"
const API_URL = "https://eth-goerli.g.alchemy.com/v2/0zK3ljg6yvA4BNNMVVa8ubI3vQkhCYeo";
const PRIVATE_KEY = "0xa1116dc51c64f3DD77be3f199DfdDB4362B1D1Cf"

import { Network, Alchemy } from "alchemy-sdk";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

const alchemy = new Alchemy(settings);

let wallet = new Wallet(PRIVATE_KEY);

async function main() {
  const latestBlock = await alchemy.transact.sendTransaction();
  console.log("The latest block number is", latestBlock);

}

main();