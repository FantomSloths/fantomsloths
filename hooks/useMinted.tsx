import { Sloth } from "@/components";
import  { currentAddresses } from "@/constants";
import FANTOM_NFT_ABI from "@/abis/FANTOM_NFT_ABI.json";
import FANTOM_USDC_ABI from "@/abis/FANTOM_USDC_ABI.json";
import { ethers, providers, utils } from 'ethers';


export async function useMinted(sloth : Sloth){

    let etherium = (window as any).ethereum;
    const provider = new ethers.providers.Web3Provider(etherium)
    console.log(etherium.selectedAddress)
    const USDCcontractAddr = currentAddresses.FANTOM_USDC_CONTRACT_ADDR
    let NFTcontractAddr = currentAddresses.FANTOM_NFT_CONTRACT_ADDR


    const Approvesigner = provider.getSigner();
    const USDCcontract = new ethers.Contract(USDCcontractAddr, FANTOM_USDC_ABI.abi, Approvesigner);
  
    try {
      let txn = await USDCcontract.approve(NFTcontractAddr, sloth.amount);
      console.log(`[Logging] Approve Loading - ${txn.hash}`)
      await txn.wait()
      console.log(`[Logging] Approve Success - ${txn.hash}`)
    }
    catch (e) { 
      console.log(e);   
      return false
    }	
    let price = 0
    if(sloth.amount==100) price = 0
    else if(sloth.amount==1000) price = 1
    else if(sloth.amount==5000) price = 2
    else if(sloth.amount==10000) price = 3
    else if(sloth.amount==50000) price = 4
    else if(sloth.amount==1000000) price = 5
    else if(sloth.amount==5000000) price = 6

    const Mintsigner = provider.getSigner();
    const Stablincontract = new ethers.Contract(NFTcontractAddr, FANTOM_NFT_ABI.abi, Mintsigner);

    console.log(sloth.amount, price, sloth.unique_token_id)

    try {
        let txn = await Stablincontract.mint(USDCcontractAddr, price, sloth.unique_token_id);
        console.log(`[Logging] Minting Loading - ${txn.hash}`)
        await txn.wait()
        console.log(`[Logging] Minting Success - ${txn.hash}`)
    }
    catch (e) { 
      console.log(e); 
      return false
    }	

    return true



}