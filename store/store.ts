import { Sloth } from "@/components";
import { create } from "zustand";
type SlothsStore = {
  
  sloth_1Ms: Sloth[];
  sloth_10Ks: Sloth[];
  sloth_1Ks: Sloth[];
  mySloth: Sloth[];
  prisonedSloth: Sloth[];

  sloth: Sloth | undefined;
  modal: boolean;
  receiverAddress: string | undefined;
  transferAmount: number | undefined;
  vertical: boolean;
  bounties : number;

  setBounties: (sloths: Sloth, sloth : Sloth[])=> void;
  closeDummySloth: () => void;
  setDummySloth: (sloths: Sloth[]) => void;
  viewDummySloth: (sloths: Sloth) => void;
  setModal: (modal: boolean) => void;
  setTransferAmount: (amount: number) => void;
  setReceiverAddress: (address: string) => void;
  resetModal: () => void;
  setVertical: (vertical: boolean) => void;
};

export const useSloths = create<SlothsStore>((set) => ({
  sloth_1Ms:[
    { 
      name: "dot_1M_jack", 
      id: "1", 
      prisoned: true, 
      url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/dot_1M_jack.png?raw=true",
      amount : 1000000,
      unique_token_id : 0
    },
    { 
      name: "dot_1M_robby", 
      id: "2", 
      prisoned: true, 
      url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/dot_1M_robby.png?raw=true",
      amount : 1000000,
      unique_token_id : 1


  },
    { 
      name: "dot_1M_tony", 
      id: "3", 
      prisoned: true, 
      url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/dot_1M_tony.png?raw=true",
      amount : 1000000,
      unique_token_id : 2
  },
  ],
  sloth_10Ks:[
    { 
      name: "dot_10K_han", 
      id: "1", 
      prisoned: true,
      url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/dot_10K_han.png?raw=true",
      amount : 10000,
      unique_token_id : 3
  },
    { 
      name: "dot_10K_kyle", 
      id: "2", 
      prisoned: true,
      url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/dot_10K_kyle.png?raw=true" ,
      amount : 10000,
      unique_token_id : 4
    },
  ],
  sloth_1Ks:[
    { 
      name: "dot_1K_mike", 
      id: "1", 
      prisoned: true,
      url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/dot_1K_mike.png?raw=true" ,
      amount : 1000,
      unique_token_id : 5
    },
    { 
      name: "dot_1K_nick", 
      id: "2", 
      prisoned: true,
      url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/dot_1K_nick.png?raw=true" ,
      amount : 1000,
      unique_token_id : 6
    },
  ],
  mySloth: [
  ] as Sloth[],
  
  prisonedSloth: [
    { name: "Bounty_1M", id: "1", prisoned: true,url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/Bounty_1M.png?raw=true", amount : 1000000, unique_token_id : 10000},
    { name: "Bounty_10K", id: "2", prisoned: true,url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/Bounty_10K.png?raw=true", amount : 10000, unique_token_id : 10001},
    { name: "Bounty_1K", id: "3", prisoned: true,url : "https://github.com/SlothDenver/sloth-ts/blob/main/public/Bounty_1K.png?raw=true", amount : 1000, unique_token_id : 10002 },
  ],
  sloth: undefined,
  modal: false,
  transferAmount: undefined,
  receiverAddress: undefined,
  vertical: false,
  bounties : 0,
  setBounties: (sloths: Sloth, sloth : Sloth[]) => 
    set(() => ({ 
      bounties: Math.floor(Math.random()*sloth.length)
    })),
  setVertical: (vertical: boolean) => set(() => ({ vertical: vertical })),
  setDummySloth: (sloths: Sloth[]) =>
    set((state) => ({ mySloth: sloths })),
  viewDummySloth: (sloth: Sloth) =>
    set((state) => ({ sloth: sloth, modal: true })),
  closeDummySloth: () =>
    set((state) => ({ sloth: undefined, modal: false })),
  setModal: (modal: boolean) => set((state) => ({ modal: modal })),
  setTransferAmount: (amount: number) =>
    set((state) => ({ transferAmount: amount })),
  setReceiverAddress: (address: string) =>
    set((state) => ({ receiverAddress: address })),
  resetModal: () =>
    set((state) => ({
      transferAmount: undefined,
      receiverAddress: undefined,
      convictzee: undefined,
      modal: false,
      vertical: false,
      bounties : 0
    })),
}));
