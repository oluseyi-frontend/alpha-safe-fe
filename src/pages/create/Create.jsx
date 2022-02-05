import {
  CircularProgress,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Heading from "../../component/Heading/Heading";
import AppStepper from "../../component/stepper/Stepper";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import styles from "./Create.module.css";
import { v4 as uuidv4 } from "uuid";
import { useMoralis, useChain } from "react-moralis";
import { ethers, Contract, ContractFactory } from "ethers";
import Moralis from "moralis";
import walletContract from "./../../contract/Wallet.json";
import { Link } from "react-router-dom";
import axios from "axios";
const Create = () => {
  const { account, enableWeb3, provider } = useMoralis();
  const [signer, setSigner] = useState();
  const [fields, setFields] = useState([]);
  const [quorum, setQuorum] = useState("1");
  const [owners, setOwners] = useState([]);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [walletAddr, setWalletAddr] = useState("");

  useEffect(() => {
    if(fields.length == 0){
      const owners = fields.map((field) => {
        return field.addr.toLowerCase();
      });
  
      setOwners(owners);
    }
    
  }, [fields]);

  useEffect(() => {
    setFields([{ addr: account, id: uuidv4() }]);
  }, [account]);

  useEffect(() => {
    handleGetWeb3Provider();
  }, [provider]);

  const handleGetWeb3Provider = async () => {
    if (provider) {
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = await web3Provider.getSigner();
      setSigner(signer);
    }
  };

  const handleCreate = async () => {
    setCreating(true);
    setLoading(true);
    try {
      const walletFactory = new ethers.ContractFactory(
        walletContract.abi,
        walletContract.bytecode,
        signer
      );

      //Moralis.web3Library.ContractFactory()

      const contract = await walletFactory.deploy(owners, quorum);
      setLoading(false);

      setWalletAddr(contract.address.toLowerCase());
      axios
        .post("https://alpha-safe-test.herokuapp.com/create", {
          addr: contract.address.toLowerCase(),
          owners,
        })
        .then((data) => {})
        .catch((err) => {});
    } catch (error) {
      setCreating(false);
    }
  };

  const handleCloseCreating = () => {
    setCreating(false);
  };

  return (
    <div className={styles.create}>
      <Container maxWidth="md">
        <div className={styles.create_content}>
          {creating ? (
            <div className={styles.loading_screen}>
              {loading ? (
                <CircularProgress />
              ) : (
                <div>
                  <Typography>
                    created successfully, your wallet address is {walletAddr},
                    navigate to wallet manager{" "}
                    <Link to={`/wallet-manager/${walletAddr}`}> here</Link>
                  </Typography>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.create_stepper}>
              <div className={styles.create_content_heading}>
                <Heading content={"Create"} variant={"h4"} />
              </div>
              <div className={styles.create_content_stepper}>
                <AppStepper
                  type={"Create"}
                  handleAction={handleCreate}
                  closeCreation={handleCloseCreating}
                  steps={[
                    {
                      stepContent: <Step1 />,
                      stepLabel: "Connect wallet & select network",
                      stepDescription: "",
                    },
                    {
                      stepContent: (
                        <Step2
                          fields={fields}
                          setFields={setFields}
                          quorum={quorum}
                          setQuorum={setQuorum}
                        />
                      ),
                      stepLabel: "Owners and Confirmations",
                      stepDescription: "",
                    },
                    {
                      stepContent: (
                        <Step3 owners={fields} confirmation={quorum} />
                      ),
                      stepLabel: "Review",
                      stepDescription: "",
                    },
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Create;
