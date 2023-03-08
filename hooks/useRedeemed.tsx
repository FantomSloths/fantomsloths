import { currentAddresses } from "@/constants";
import { ethers } from "ethers";
import FANTOM_NFT_ABI from "@/abis/FANTOM_NFT_ABI.json";

export async function useRedeemed(tokenId : number | undefined) {
    let etherium = (window as any).ethereum;
    const provider = new ethers.providers.Web3Provider(etherium)
    console.log(etherium.selectedAddress)
    let NFTcontractAddr = currentAddresses.FANTOM_NFT_CONTRACT_ADDR

    const Redeemsigner = provider.getSigner();
    const Stablincontract = new ethers.Contract(NFTcontractAddr, FANTOM_NFT_ABI.abi, Redeemsigner);
        
    try {
        let txn = await Stablincontract.redeem(tokenId);
        console.log(`[Logging] Redeem Loading - ${txn.hash}`)
        await txn.wait()
        console.log(`[Logging] Redeem Success - ${txn.hash}`)
    } catch (e) { 
        console.log(e); 
        return false
    }	
    return true
}


export async function RetreiveMyToken(account : string | undefined | null) {
    let etherium = (window as any).ethereum;
    const provider = new ethers.providers.Web3Provider(etherium)
    let NFTcontractAddr = currentAddresses.FANTOM_NFT_CONTRACT_ADDR

    const getOwnerSign = provider.getSigner();
    const Stablincontract = new ethers.Contract(NFTcontractAddr, FANTOM_NFT_ABI.abi, getOwnerSign);

    for(var i = 0 ; i<=100; i++){
        try{
            let txn2 = await Stablincontract.ownerOf(i);
            if(txn2 == account){
                console.log("[Logging]",account, " Have Token ", i);
                return i;
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return undefined
}
