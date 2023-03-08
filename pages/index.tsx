import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Button, Input, Modal } from "antd";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { TransferModal } from "@/components/TransferModal";
import { SlothsCarousel } from "@/components";
import { useSloths } from "@/store/store";
import ConnectButton from "@/components/ConnectButton";
import {
  CheckCircleOutlined,
  CloseOutlined,
  LeftOutlined,
} from "@ant-design/icons";

import { useWeb3React } from "@web3-react/core";
import { useMinted } from "@/hooks/useMinted";
import { RetreiveImageId, RetreiveMyToken, useRedeemed } from "@/hooks/useRedeemed";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {active, account} = useWeb3React();
  const slothState = useSloths();
  const router = useRouter();


  return (
    <div className="w-full bg-black -z-50 text-white">
      <div className="container relative px-4 py-24 z-20">
        <Modal
          footer
          width={slothState.vertical ? "max-content" : 400}
          className="text-white"
          open={slothState.modal}
          onCancel={() => {
            slothState.resetModal();
            Router.replace({ pathname: Router.pathname });
          }}
          onOk={() => {
            slothState.resetModal();
            Router.replace({ pathname: Router.pathname });
          }}
          closeIcon={<CloseOutlined className="text-gray-400" />}
        >
          <Button
            type="ghost"
            className=" text-gray-400"
            onClick={() => {
              slothState.resetModal();
              Router.replace({ pathname: Router.pathname });
            }}
          >
            <LeftOutlined />
          </Button>
          {router.query.state === "transfer" ? (
            slothState.sloth && (
              <TransferModal
                title={"Transfer"}
                sloth={slothState.sloth}
              >
                <div className=" font-medium py-6">
                  Would you like to transfer with token?
                </div>
                <div className="flex">
                  <Button
                    className="w-24 text-sm bg-black h-8  mr-2 text-white"
                    onClick={() =>
                      router.replace({
                        pathname: router.pathname,
                        query: { state: "transferWithoutToken" },
                      })
                    }
                  >
                    NO
                  </Button>
                  <Button
                    className="w-24 text-sm bg-black h-8 text-white"
                    onClick={() =>
                      router.replace({
                        pathname: router.pathname,
                        query: { state: "transferWithToken" },
                      })
                    }
                  >
                    YES
                  </Button>
                </div>
              </TransferModal>
            )
          ) : router.query.state === "transferWithToken" ? (
            slothState.sloth && (
              <TransferModal
                imageSize={120}
                title={"Transfer with Token"}
                sloth={slothState.sloth}
              >
                <div className="self-start py-4 font-semibold">Amount</div>
                <Input
                  type="number"
                  placeholder={"Enter the token amount"}
                  className=" bg-gray-800 text-white border-none placeholder:text-gray-400"
                  onChange={(e) =>
                    slothState.setTransferAmount(e.target.valueAsNumber)
                  }
                ></Input>
                <div className="self-start py-4 font-semibold">
                  Receiver Address
                </div>
                <Input
                  placeholder="Enter receiver's address"
                  className=" bg-gray-800 text-white border-none placeholder:text-gray-400"
                  onChange={(e) =>
                    slothState.setReceiverAddress(e.target.value)
                  }
                ></Input>
                <Button
                  className="w-max text-sm bg-black h-8 my-4 text-white"
                  onClick={async() =>{
                    //await fuelTransferWithToken(fuel, convictState.transferAmount, convictState.receiverAddress)
                    
                    router.replace({
                      pathname: router.pathname,
                      query: { state: "transferConfirm" },
                    })
                  }}
                >
                  TRANSFER
                </Button>
              </TransferModal>
            )
          ) : router.query.state === "transferConfirm" ? (
            slothState.sloth && (
              <TransferModal
                imageSize={120}
                title={"Transfer"}
                sloth={slothState.sloth}
              >
                <div className="-mt-6">
                  {slothState.transferAmount && (
                    <>
                      <div className="text-lg font-medium">&</div>
                      <div className="text-lg font-medium pb-6">
                        {slothState.transferAmount}
                      </div>
                    </>
                  )}
                  <div className="text-lg flex font-medium py-6">
                    Receiver
                    <div className="text-lg flex font-medium text-[#F1FF00] ml-4">
                      {slothState.receiverAddress}
                    </div>
                  </div>
                </div>
                <Button
                  className="w-24 min-w-max text-sm bg-black h-8 my-4 text-white"
                  onClick={() =>
                    router.replace({
                      pathname: router.pathname,
                      query: { state: "transactionSent" },
                    })
                  }
                >
                  CONFIRM
                </Button>
              </TransferModal>
            )
          ) : router.query.state === "transactionSent" ? (
            <div className="w-full flex flex-col items-center">
              <div className="py-10 text-7xl text-[#F1FF00]">
                <CheckCircleOutlined />
              </div>
              <div className="text-2xl">Transcation sent</div>

              <div className=" font-medium py-6">
                Item will be transfered once transaction confirms.
              </div>

              <Button
                className="w-24 min-w-max text-sm bg-black h-8 my-4 text-white"
                onClick={() => {
                  slothState.resetModal();
                  router.replace({ pathname: router.pathname });
                }}
              >
                OK
              </Button>
            </div>
          ) : router.query.state === "transferWithoutToken" ? (
            slothState.sloth && (
              <TransferModal
                imageSize={120}
                title={"Transfer"}
                sloth={slothState.sloth}
              >
                <div className="self-start py-4 font-semibold">
                  Receiver Address
                </div>
                <Input
                  placeholder="Enter receiver's address"
                  className=" bg-gray-800 text-white border-none placeholder:text-gray-400"
                  onChange={(e) =>
                    slothState.setReceiverAddress(e.target.value)
                  }
                ></Input>
                <Button
                  className="w-24 min-w-max text-sm bg-black h-8 my-4 text-white"
                  onClick={async() =>{
                    //await fuelTransferWithOutToken(fuel, convictState.transferAmount, convictState.receiverAddress)
                    router.replace({
                      pathname: router.pathname,
                      query: { state: "transferConfirm" },
                    })
                  }}
                >
                  TRANSFER
                </Button>
              </TransferModal>
            )
          ) : router.query.state === "redeem" ? (
            slothState.sloth && (
              <TransferModal
                title={"Redeem"}
                sloth={slothState.sloth}
              >
                <div className=" py-4 font-semibold">
                  Are you sure you want to throw this sloth back into prison and
                  take the bounty of $
                    {
                  slothState.sloth.amount==1000000 ? 
                  "1,000,000" : 
                  slothState.sloth.amount==10000 ? 
                  "10,000" : 
                  "1,000"
                    }? 
                </div>
                <Button
                  className="w-24 min-w-max text-sm bg-black h-8 my-4 text-white"
                  onClick={() =>
                    router.replace({
                      pathname: router.pathname,
                      query: { state: "redeemConfirm" },
                    })
                  }
                >
                  Yes
                </Button>
              </TransferModal>
            )
          ) : router.query.state === "redeemConfirm" ? (
            slothState.sloth && (
              <div className="w-full flex flex-col items-center">
                <div className="py-10 text-7xl text-[#F1FF00]">
                  <CheckCircleOutlined />
                </div>
                <div className="text-2xl">Redeem Request Approved</div>

                <div className=" font-medium py-6">
                  You will receive the bounty once transaction confirms.
                </div>

                <Button
                  className="w-24 min-w-max text-sm bg-black h-8 my-4 text-white"
                  onClick={async () => {
                    
                    let isRedeemed = false
                    const tokenId = await RetreiveMyToken(account)
                    const imgId = await RetreiveImageId(tokenId)
                    isRedeemed = await useRedeemed(tokenId)

                    if(! isRedeemed ) {
                      slothState.resetModal();
                      router.replace({ pathname: router.pathname });
                      return
                    }
                    const redeemed = slothState.mySloth.filter((sloth) => sloth.unique_token_id == imgId).pop()
                    console.log(redeemed)
                    slothState.mySloth = slothState.mySloth.filter((sloth) => sloth.unique_token_id != imgId)
                    console.log(slothState.mySloth)

                    if(redeemed?.amount==1000000) {
                      slothState.sloth_1Ms.push(redeemed)
                    }
                    else if (redeemed?.amount==10000) {
                      slothState.sloth_10Ks.push(redeemed)
                    }
                    else if(redeemed?.amount==1000){
                      slothState.sloth_1Ks.push(redeemed)
                    }
                  
                    slothState.resetModal();
                    router.replace({ pathname: router.pathname });
                  }}
                >
                  OK
                </Button>
              </div>
            )
          ) : router.query.state === "mint" ? (
            slothState.sloth && (
              <TransferModal.Vertical
                title={"Mint"}
                sloth= {
                  slothState.sloth.id=="1" ? 
                  slothState.sloth_1Ms[slothState.bounties] : 
                  slothState.sloth.id=="2" ? 
                  slothState.sloth_10Ks[slothState.bounties] : 
                  slothState.sloth_1Ks[slothState.bounties]
                }
              >
                <div className=" w-[302px] px-8 h-[200px] flex flex-col justify-between items-center">
                  <div className=" pb-4 font-semibold">
                    Are you sure you want to mint this stable NFT? The Sloth
                    will have a bounty of $
                    {slothState.sloth.id=="1" ? 
                    "1,000,000" : 
                    slothState.sloth.id=="2" ? 
                    "10,000" : 
                    "1,000"
                    }? 
                  </div>
                  <div className="flex flex-col w-full">
                    <Button
                      className="w-full text-sm bg-black h-8 mb-2 text-white"
                      onClick={
                        async () =>  {
                          const mintNFT = slothState.sloth?.id=="1" ? 
                          slothState.sloth_1Ms : 
                          slothState.sloth?.id=="2" ? 
                          slothState.sloth_10Ks : 
                          slothState.sloth_1Ks
                          const idx = slothState.bounties

                          const isMinted = await useMinted(mintNFT[idx])
                          if(!isMinted) {
                            slothState.resetModal();
                            router.replace({
                              pathname: router.pathname,
                            });
                            return
                          }

                          slothState.mySloth.push(mintNFT[idx]) 
                        
                          const newNFTs = mintNFT.filter((sloth) => sloth.unique_token_id != mintNFT[idx].unique_token_id)

                          slothState.sloth?.id=="1" ? 
                          slothState.sloth_1Ms = newNFTs : 
                          slothState.sloth?.id=="2" ? 
                          slothState.sloth_10Ks = newNFTs : 
                          slothState.sloth_1Ks = newNFTs
                          slothState.resetModal();
                          router.replace({
                            pathname: router.pathname,
                          });
                        }}
                    >
                      YES, Jailbreak the Sloth!
                    </Button>
                    <Button
                      className="w-full text-sm bg-black h-8 my-2 text-white"
                      onClick={() => {
                        slothState.resetModal();
                        router.replace({
                          pathname: router.pathname,
                        });
                      }}
                    >
                      NO, Keep him in jail!
                    </Button>
                  </div>
                </div> 
              </TransferModal.Vertical>
            )
          )  : (
            <></>
          )}
          {router.query.state === ""}
        </Modal>
        <div className="w-full flex justify-between">
          <div className=" font-bold text-xl flex items-center">
            Sloths on the Run
          </div>
          <ConnectButton />
        </div>
        <div className="w-full mt-10 flex ">
          <div className="flex items-center w-full">
            <div>
              <div className=" text-5xl font-bold my-4">Sloths on the Run</div>
              <div className="mb-10">
                Meet the sloths that you&apos;ve never seen before – these
                slow-moving creatures have turned into adrenaline-pumping,
                lightning-fast escape artists after committing some serious
                crimes in the web3 universe. <br />
                Once you&apos;ve minted your stable NFT of the convict sloth, he is
                yours to control.
                <br />
                Redeem your money by throwing him back into prison for the
                bounty on his head.
                <br />
              </div>
              <Button className="h-10">Find out more</Button>
            </div>
          </div>
          <div className="w-[50%] min-w-[300px] h-full flex items-center justify-center -z-10">
            <div className="absolute -z-20 top-80 -right-80 ">
              <Image
                src="/coinBlured.svg"
                alt="bluredCoin"
                width={626}
                height={904}
                className="object-contain"
              />
            </div>
            <div className="absolute -z-20 top-0">
              <Image
                src="/coinBlured2.svg"
                alt="bluredCoin2"
                width={481}
                height={297}
                className="object-contain"
              />
            </div>
            <img
              src="/rollingCoins.png"
              alt="convictzees"
              className=" object-contain ml-10"
            />
          </div>
        </div>
        <SlothsCarousel
          sloths={slothState.prisonedSloth}
          title="Mint Sloths from Prison"
          arrowDisable = {true}
        />
        {
        active && slothState.mySloth.length != 0 ? 
        <SlothsCarousel
          sloths={slothState.mySloth}
          title="My Sloths"
          state="redeem"
          arrowDisable = {false}
        />:
        <div className="justify-between my-16">
          <div className="text-2xl font-bold my-8">
            My Sloths
            </div>
          <div className="bg-[#191919] w-[98%] h-[300px] py-20 text-2xl font-bold item-center text-center">
            No Sloths Yet!
            <div className="text-sm">
              Your sNFT will appear here!
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  );
}
