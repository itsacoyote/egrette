import { mainnet, sepolia } from "@wagmi/core/chains"

export const l1Mainnet = {
  ...mainnet,
  name: "Ethereum",
  network: "mainnet",
  rpcUrls: {
    default: {
      http: [
        "https://ethereum-rpc.publicnode.com",
        "https://cloudflare-eth.com",
      ],
    },
  },
}

export const l1Sepolia = {
  ...sepolia,
  name: "Ethereum Sepolia Testnet",
  rpcUrls: {
    default: {
      http: [
        "https://ethereum-sepolia-rpc.publicnode.com",
        "https://rpc.sepolia.org",
      ],
    },
  },
}
