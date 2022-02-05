import React, { useEffect, useState } from "react";
import { useMoralis, useChain, useWeb3ExecuteFunction } from "react-moralis";
export const dataCentral = React.createContext();

const AppContext = (props) => {
    const {account} = useMoralis()
    const [selectedSafe, setSelectedSafe] = useState("");
    const [walletContract, setWalletContract] = useState({})

  return (
    <dataCentral.Provider
      value={{
       selectedSafe,
       setSelectedSafe,
       setWalletContract,
       walletContract
       
      }}
    >
      {props.children}
    </dataCentral.Provider>
  );
};

export default AppContext;
