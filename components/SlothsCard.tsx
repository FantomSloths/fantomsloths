import { useSloths } from "@/store/store";
import { useWeb3React } from "@web3-react/core";
import { Button, Popover } from "antd";
import Router from "next/router";
import { useState } from "react";
import { Sloth } from "./SlothsCarousel";

export const SlothsCard = ({
  sloth,
  state,
}: {
  sloth: Sloth;
  state: string;
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const {active} = useWeb3React();

  const slothState = useSloths();
  return (
    <>
      <div
        className="rounded cursor-pointer w-[33%] flex justify-center relative"
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseOut={() => {
          setHovered(false);
        }}
      >
        <img
          src={`${sloth.name}.png`}
          className="object-contain w-[90%] rounded"
        />
        <div
          className={`absolute transition bottom-3 right-8 ${
            hovered ? " opacity-100" : " opacity-0"
          }`}
        >
          {state !== "transfer" ? (
            <>
              <Button
                className="bg-[#1d1d1d80] mr-4 text-white backdrop-blur"
                onClick={() => {
                  slothState.viewDummySloth(sloth);
                  Router.replace({
                    pathname: Router.pathname,
                    query: { state: "transfer" },
                  });
                }}
              >
                Transfer
              </Button>
              <Button
                className="bg-[#1d1d1d80] text-white backdrop-blur"
                onClick={() => {
                  slothState.viewDummySloth(sloth);
                  Router.replace({
                    pathname: Router.pathname,
                    query: { state: "redeem" },
                  });
                }}
              >
                Redeem
              </Button>
            </>
          ) : (active) && (
            <Button
              className="bg-[#1d1d1d80] text-white backdrop-blur"            
              disabled = {!active}
              onClick={() => {
                slothState.viewDummySloth(sloth);
                slothState.setVertical(true);
                  sloth.id == '1' ? 
                  slothState.setBounties(sloth, slothState.sloth_1Ms) :
                    sloth.id == '2' ? 
                    slothState.setBounties(sloth, slothState.sloth_10Ks) :
                    slothState.setBounties(sloth, slothState.sloth_1Ks)
                  Router.replace({
                    pathname: Router.pathname,
                    query: { state: "mint" },
                  });
              }}
            >
              Mint
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
