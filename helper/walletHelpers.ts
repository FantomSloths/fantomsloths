import getChain from "@/constants"

const chain = getChain(parseInt("4002"))

async function addTokenToMetamask(
  address: string,
  symbol: string,
  decimals: number
) { 
  let provider = (window as any).ethereum;
  await provider.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20", // Initially only supports ERC20, but eventually more!
      options: {
        address: address, // The address that the token is at.
        symbol: symbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals: decimals, // The number of decimals in the token
        // image: `${window?.location?.origin}/images/renaissance_meta.png`, // A string url of the token logo
      },
    },
  })
}

async function switchChains(chainID : number) {
  try {
    let provider = (window as any).ethereum;
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: getChain(chainID).chainId }],
    })
  } catch (error) {
    if ((error as any).code === 4902 || (error as any).code === -32603) {
      await addChain(chainID);
    }
  }
}

async function addChain(chainID : number) {
  try { 
    let provider = (window as any).ethereum;
    await provider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...getChain(chainID),
        },
      ],
    })
  } catch (addError) {
    console.error(addError)
  }
}

export { addTokenToMetamask, switchChains, addChain }