import { Button, Carousel, ConfigProvider, Select } from "antd";
import { useRef } from "react";
import { SlothsCard } from "@/components/SlothsCard";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export type Sloth = {
  name: string;
  id: string;
  prisoned: boolean;
  url : string;
  amount : number;
  unique_token_id : number;
};
export type SlothCarouselProps = {
  sloths: Sloth[];
  title: string;
  state?: string;
  arrowDisable: boolean;
};

export function spliceIntoChunks(arr: any[], chunkSize: number) {
  const buf = [...arr];
  const res: any[][] = [];
  while (buf.length > 0) {
    const chunk = buf.splice(0, chunkSize);
    res.push(chunk);
  }
  return res;
}

export const SlothsCarousel = ({
  sloths,
  title,
  state = "transfer",
  arrowDisable,
}: SlothCarouselProps) => {
  const slider = useRef<any>(null);

  return (
    <>
      <div className=" flex justify-between my-8">
        <div className=" text-2xl font-bold">{title}</div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "rgba(0, 0, 0, 0.6)",
            },
          }}
        >
        </ConfigProvider>
      </div>
      <div className="w-full flex items-center">
        {
        arrowDisable ? 
        <></> :
        <Button
          className="-mr-10 z-10 text-white w-4 bg-inherit border-0 flex flex-col items-center"
          onClick={() => slider.current.prev()}
        >
          <LeftOutlined className=" text-lg" />
        </Button>
        }
        <div className="w-full">
          <Carousel
            ref={slider}
            autoplay={true}
            autoplaySpeed={3000}
            dots={false}
          >
            {spliceIntoChunks(sloths.sort(), 3).map((chunk, i) => (
              <div key={i}>
                <div className="flex w-full">
                  {chunk.map((sloth, idx) => (
                    <SlothsCard
                      sloth={sloth}
                      state={state}
                      key={idx}
                    />
                  ))}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        {
        arrowDisable ? 
        <></> :
        <Button
          className="-ml-10 z-10 text-white w-4 bg-inherit border-0 flex flex-col items-center"
          onClick={() => slider.current.next()}
        >
          <RightOutlined className="text-lg " />
        </Button>
        } 
      </div>
    </>
  );
};
