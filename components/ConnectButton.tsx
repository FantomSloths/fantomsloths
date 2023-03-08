import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { injected , walletconnect} from "@/connectors/connectors";

//import { getErrorMessage }      TODO  : ERROR CODES
//import { switchChains }         TODO  : SWITCHING WALLET

import {
  Button,
  Dropdown,
  MenuProps,
  Modal,
  Select,
  Space,
  Typography,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useState } from "react";

import { getErrorMessage } from "@/helper/getErrorMessage";
import { switchChains } from "@/helper/walletHelpers";

function ConnectButton() {
  
  const { Text } = Typography;



  // For MetaMask
  const { activate, active, account, error, deactivate} = useWeb3React();

  const EtherrorMessage = getErrorMessage(error)

  const handleEthDisConnect = () => {
    deactivate();
  }
  const handleEthConnect = async () => {
    await switchChains(4002)
    await activate(injected, (error) => {
      getErrorMessage(error)
    });
  };
  const handleSwitchChain = (value : number) => {
    switchChains(value)
  }
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Text
          className="flex text-white cursor-pointer items-center  font-medium rounded-lg hover:bg-black transition"
          onClick={handleEthConnect}
        >
          <Image
            src="/images/connectors/metamask-fox.svg"
            width={24}
            priority
            height={24}
            alt="MetaMask"
          />
          <span>MetaMask</span>
        </Text>
      ),
    },
    {
      key: "2",
      label: (
        <Text
          className="flex text-white cursor-pointer items-center  font-medium rounded-lg hover:bg-black transition"
          onClick={async () => {
            await activate(walletconnect);
          }}
        >
          <Image
            src="/images/connectors/walletconnect-logo.svg"
            width={24}
            height={24}
            priority
            alt="WalletConnect"
          />
          <span>Wallet Connect</span>
        </Text>
      ),
    },
  ];

  if(active) {
    return (
      <div className="flex md:px-2 2xl:px-4 items-center ">
         <Select 
          onChange={handleSwitchChain}
          className="w-36 mx-2 text-white"
          defaultValue = {4002}
            >
          <Select.Option value={4002} key = {0}>
          <Image
            src="/images/connectors/fantom-logo.png"
            width={24}
            priority
            height={24}
            alt="MetaMask"
          />
          <span className="text-white">Fantom</span>
          </Select.Option>
        </Select>
{//------------------------------------------------
}
        <Select 
          className="w-36 mx-2 text-white"
          defaultValue = {0}
        >
          {
            <Select.Option value={0} key = {0}>
          <span className="text-white">{account}</span>
          </Select.Option>
          }
        </Select>
        
      <Button 
        className="bg-black backdrop-blur text-white"
        onClick={handleEthDisConnect}>
        <LogoutOutlined />
      </Button>
    </div>
    )
  }
  return (
    <div className="md:px-2 2xl:px-4">
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button className="bg-[#F1FF0099] text-black border-none h-10 text-base font-bold" >
          Connect Wallet
        </Button>
      </Dropdown>
    </div>
  );
}

export default ConnectButton;