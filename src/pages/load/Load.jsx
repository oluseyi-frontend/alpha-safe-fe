import { Container } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import Heading from "../../component/Heading/Heading";
import AppStepper from "../../component/stepper/Stepper";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import styles from "./Load.module.css";
import { v4 as uuidv4 } from "uuid";
import { useMoralis, useChain ,useWeb3ExecuteFunction } from "react-moralis";
import { ethers, Contract, ContractFactory } from "ethers";
import Moralis from "moralis";
import walletContractJSON from "./../../contract/Wallet.json";
import { dataCentral } from "./../../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Load = () => {
  const { selectedSafe, setSelectedSafe, setWalletContract } =
    useContext(dataCentral);
  const { account, enableWeb3, provider } = useMoralis();
  const [signer, setSigner] = useState();
  const [wallets, setWallets] = useState([])
  const contractProcessor = useWeb3ExecuteFunction();
  const navigate = useNavigate();
  // Moralis.web3Library.ContractFactory()
   // Moralis.web3Library.Contract()


   useEffect(()=>{
     handleFetchWallets()
    
   }, [account])


  useEffect(() => {
    handleGetWeb3Provider();
  }, [provider]);
  
  const handleFetchWallets=()=>{
    if(account){
      axios.get(`https://alpha-safe-test.herokuapp.com/load/${account}`).then((data)=>{
     

        if(data){
          let tempWallets = []
         data.data.data.map((item)=>{
            tempWallets.push(item.walletAddr)
          })
          setWallets(tempWallets)
        }
      }).catch((err)=>{
        console.log(err)
      })
     }
  }
  const handleGetWeb3Provider = async () => {
    if (provider) {
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = await web3Provider.getSigner();
      setSigner(signer);
    }
  };

  const handleLoad = async () => {
    const tempWallet = new ethers.Contract(
      selectedSafe,
      walletContractJSON.abi,
      signer
    );

    setWalletContract(tempWallet);
    navigate(`/wallet-manager/${selectedSafe}`);

    // let options = {
    //   contractAddress: selectedSafe,
    //   functionName: "transactionRequest",
    //   abi: walletContractJSON.abi,
    //   params: {
    //     _to: "0x695eb44F9Bf7548238d48b153E82b815A960D763",
    //     _value: Moralis.Units.ETH(0.01),
    //   },
    // };

    // await contractProcessor.fetch({
    //   params: options,
    //   onSuccess: () => {
    //     console.log("done");
    //   },
    //   onError: () => {
    //     console.log("error");
    //   },
    // });
  };

  return (
    <div className={styles.create}>
      <Container maxWidth="md">
        <div className={styles.create_content}>
          <div className={styles.create_content_heading}>
            <Heading content={"Load"} variant={"h4"} />
          </div>
          <div className={styles.create_content_stepper}>
            <AppStepper
              type={"Open Wallet Manager"}
              handleAction={handleLoad}
              steps={[
                {
                  stepContent: <Step1 />,
                  stepLabel: "Connect wallet & select network",
                  stepDescription: "",
                },
                {
                  stepContent: (
                    <Step2
                      selectedSafe={selectedSafe}
                      setSelectedSafe={setSelectedSafe}
                      wallets={wallets}
                    />
                  ),
                  stepLabel: "Owners and Confirmations",
                  stepDescription: "",
                },
                {
                  stepContent: (
                    <Step3 selectedSafe={selectedSafe} account={account} />
                  ),
                  stepLabel: "Review",
                  stepDescription: "",
                },
              ]}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Load;
