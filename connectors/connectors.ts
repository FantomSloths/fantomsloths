import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"

import getChain from "@/constants"



const chainID = parseInt("4002")
const chain = getChain(chainID)

export const injected = new InjectedConnector({ supportedChainIds: [chainID] })

export const walletconnect = new WalletConnectConnector({
  rpc: { [chainID]: chain.rpcUrls[0] },
  qrcode: true,
})