interface IChain {
  [key: string]: {
    chainId: string
    chainName: string
    rpcUrls: string[]
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
    }
    blockExplorerUrls: string[]
  }
}

interface IAddresses {
  [chainId: number]: {
    FANTOM_NFT_CONTRACT_ADDR : string,
    FANTOM_USDC_CONTRACT_ADDR : string,
  }
}

export const addresses: IAddresses = {
  4002 : {
    FANTOM_USDC_CONTRACT_ADDR : "0x91a43bdDCbFAe6207bD374621afb04f2310C15d2",
    FANTOM_NFT_CONTRACT_ADDR : "0xA298BEA82186Ce4B54A1036B8cd3c2ed4cE1ba0b"
  }
}


export const chains: IChain = {
  4002 : {
    chainId : "0xfa2",
    chainName : "Fantom testnet",
    rpcUrls: ["https://rpc.testnet.fantom.network/"],
    nativeCurrency: { 
      name: "FTM", 
      symbol: "FTM", 
      decimals: 18 },
      blockExplorerUrls: ["https://testnet.ftmscan.com"]
  },
}

export type Chain = keyof typeof chains

const getChain = (chainId: number) => {
  return chains[chainId]
}

export const getAddresses = (chainId: Chain) => {
  return addresses[chainId as number]
}

export const currentAddresses = getAddresses(
  parseInt("4002")
)

export default getChain

