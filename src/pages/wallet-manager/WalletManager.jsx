import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import styles from "./WalletManager.module.css";
import {
  useMoralis,
  useWeb3Transfer,
  useWeb3Contract,
  useWeb3ExecuteFunction,
  useMoralisSubscription,
} from "react-moralis";
import { dataCentral } from "./../../context/AppContext";
import Moralis from "moralis";
import AppCard from "../../component/card/Card";
import walletContractJson from "./../../contract/Wallet.json";
import { useParams } from "react-router-dom";
import useModal from "../../custom hooks/useModal";
import ApprovalModal from "../../component/approvalModal/ApprovalModal";
import AppBackdrop from "../../component/appBackdrop/AppBackdrop";
import PendingCard from "../../component/pendingCards/PendingCards";
import WalletDetail from "../../component/walletDetail/WalletDetail";
import axios from "axios";
const WalletManager = () => {
  const {
    account,
    provider,
    enableWeb3,
    isAuthenticated,
    authenticate,
    isWeb3Enabled,
    web3,
  } = useMoralis();
  const params = useParams();
  const { toggle, isApprovalModalShowing } = useModal();

  const [totalOwners, setTotalOwners] = useState("");
  const [ownersAddr, setOwnerAddress] = useState([]);
  const [walletBalance, setWalletBalance] = useState("");
  const [threshold, setThreshhold] = useState("");
  const [inputField1, setInputField1] = useState("");
  const [inputField2, setInputField2] = useState(Number);
  const [ethVal, setEthVal] = useState(Number);
  const [loadPendingData, setLoadPendingData] = useState();

  const [pendingTransactionData, setPendingTransactionData] = useState([]);
  const [pendingAddOwnerData, setPendingAddOwnerData] = useState([]);
  const [pendingRemoveOwnerData, setPendingRemoveOwnerData] = useState([]);
  const [pendingUpdatethresholdData, setPendingUpdatethresholdData] = useState(
    []
  );
  const [pendingTrx, setPendingTrx] = useState([]);
  const [quorum, setQuorum] = useState([]);
  const [rmOwner, setRmOwner] = useState([]);
  const [addOwner, setAddOwner] = useState([]);
  const [loading, setLoading] = useState(true);

  useMoralisSubscription("newdeposit", (q) => q, [], {
    onCreate: (data) => console.log(data.attributes),
  });
  useMoralisSubscription("newtransaction", (q) => q, [], {
    onCreate: (data) => {
      console.log(data.attributes);

      handleActionAfterNewTransaction(data);
    },
  });
  useMoralisSubscription("newthreshold", (q) => q, [], {
    onCreate: (data) => {
      console.log(data.attributes);
      handleActionAfterThresholdUpdates(data);
    },
  });
  useMoralisSubscription("ownerremove", (q) => q, [], {
    onCreate: (data) => {
      handleActionAfterOwnerRemoved(data);
    },
  });
  useMoralisSubscription("owneradded", (q) => q, [], {
    onCreate: (data) => {
      handleActionAfterOwnerAdded(data);
    },
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      handleGetPendingTransactionData();
      handleGetPendingAddOwnerData();
      handleGetPendingUpdatethresholdData();
      handleGetPendingRemoveOwnerData();
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    if (isAuthenticated) {
      enableWeb3();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isWeb3Enabled) {
      handleFetchWalletDetails();
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    handleRestructureData();
  }, [
    pendingTransactionData,
    pendingUpdatethresholdData,
    pendingAddOwnerData,
    pendingRemoveOwnerData,
  ]);

  useEffect(() => {
    if (ownersAddr.length > 0) {
      updateDBWithNewOwners(ownersAddr);
    }
  }, [ownersAddr]);

  const updateDBWithNewOwners = (owners) => {
   
    axios
      .patch(`https://alpha-safe-test.herokuapp.com/${params.selectedSafe.toLowerCase()}`, {
        owners: owners,
      })
      .then((data) => {
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleActionAfterNewTransaction = (data) => {
    setWalletBalance(
      walletBalance - Moralis.Units.FromWei(data.attributes.value)
    );
  };
  const handleActionAfterThresholdUpdates = (data) => {
    setThreshhold(data.attributes.newthreshold);

    const remQuorum = quorum.filter((quo) => {
      if (quo.threshold != data.attributes.newthreshold) {
        return quo;
      }
    });

    setQuorum(remQuorum);
  };
  const handleActionAfterOwnerRemoved = (data) => {
    setTotalOwners(totalOwners - 1);
    const remOwners = ownersAddr.filter((addr) => {
      if (addr.toLowerCase() !== data.attributes.removed) {
        return addr;
      }
    });
    setOwnerAddress(remOwners);

    const remRmOwner = rmOwner.filter((owner) => {
      if (owner.addr.toLowerCase() !== data.attributes.removed) {
        return owner;
      }
    });
    //updateDBWithNewOwners(remOwners)
    setRmOwner(remRmOwner);
  };

  const handleActionAfterOwnerAdded = (data) => {
    setTotalOwners(totalOwners * 1 + 1);
    setOwnerAddress([data.attributes.newOwner, ...ownersAddr]);
    const remAddOwner = addOwner.filter((owner) => {
      if (owner.addr.toLowerCase() !== data.attributes.newOwner) {
        return owner;
      }
    });

    setAddOwner(remAddOwner);
    //updateDBWithNewOwners(remAddOwner)
  };

  const handleRestructureData = () => {
    const temptrx = pendingTransactionData.map((data) => {
      return {
        addr: data[0],
        value: Moralis.Units.FromWei(data[1].toString()),
        index: data[2].toString(),
        sig: data[3].toString(),
        approved: data[4],
      };
    });
    setPendingTrx(temptrx);

    const tempQuorum = pendingUpdatethresholdData.map((data) => {
      return {
        threshold: data[0].toString(),
        index: data[1].toString(),
        sig: data[2].toString(),
        approved: data[3],
      };
    });

    setQuorum(tempQuorum);

    const tempAddOwner = pendingAddOwnerData.map((data) => {
      return {
        addr: data[0],
        index: data[1].toString(),
        sig: data[2].toString(),
        approved: data[3],
      };
    });
    setAddOwner(tempAddOwner);

    const tempRmOwner = pendingRemoveOwnerData.map((data) => {
      return {
        addr: data[0],
        index: data[1].toString(),
        sig: data[2].toString(),
        approved: data[3],
      };
    });
    setRmOwner(tempRmOwner);
  };

  const { fetch, error, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.ETH(ethVal === "" ? 0 : ethVal),
    receiver: params.selectedSafe,
    type: "native",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name1") {
      setInputField1(value);
    } else if (name === "name2") {
      setInputField2(value);
    } else if (name === "ethFunds") {
      setEthVal(value);
    }
  };

  const handleFetchWalletDetails = async () => {
    const options = {
      abi: walletContractJson.abi,
      contractAddress: params.selectedSafe,
    };

    try {
      const totalowners = await Moralis.executeFunction({
        functionName: "totalOwners",
        ...options,
      });
      const ownersaddr = await Moralis.executeFunction({
        functionName: "getOwnersAddress",
        ...options,
      });
      const walletbalance = await web3.getBalance(params.selectedSafe);
      const thresh = await Moralis.executeFunction({
        functionName: "threshold",
        ...options,
      });
     const tempOwnerAddr = ownersaddr.map((owneraddr)=>{
        return owneraddr.toLowerCase()
      })
   
      setOwnerAddress(tempOwnerAddr);
      setWalletBalance(Moralis.Units.FromWei(walletbalance.toString()));
      setThreshhold(thresh.toString());
      setTotalOwners(totalowners.toString());

      setLoading(false);
    } catch (error) {}
  };

  const handleDepositFunds = async () => {
    fetch();
  };

  const handleRequestTransaction = async () => {
    const options = {
      abi: walletContractJson.abi,
      contractAddress: params.selectedSafe,
      functionName: "transactionRequest",
      params: {
        _to: inputField1,
        _value: Moralis.Units.ETH(inputField2),
      },
    };
    const result = await Moralis.executeFunction(options);
    console.log(result);
  };

  const handleRequestToRemoveAnOwner = async () => {
    const options = {
      abi: walletContractJson.abi,
      contractAddress: params.selectedSafe,
      functionName: "removeOwnerRequest",
      params: {
        _remove: inputField1,
      },
    };
    const result = await Moralis.executeFunction(options);
    console.log(result);
  };

  const handleRequestToUpdateQuorum = async () => {
    const options = {
      abi: walletContractJson.abi,
      contractAddress: params.selectedSafe,
      functionName: "updatethresholdRequest",
      params: {
        _newThreshold: inputField1,
      },
    };
    const result = await Moralis.executeFunction(options);
    console.log(result);
  };

  const handleRequestToAddAnOwner = async () => {
    const options = {
      abi: walletContractJson.abi,
      contractAddress: params.selectedSafe,
      functionName: "addOwnerRequest",
      params: {
        _newOwner: inputField1,
      },
    };
    const result = await Moralis.executeFunction(options);
    console.log(result);
  };

  const handleToggleApprovalModal = () => {
    toggle("approval-modal");
  };

  const handleGetPendingTransactionData = async () => {
    const options = {
      abi: walletContractJson.abi,
      contractAddress: params.selectedSafe,
      functionName: "pendingTransactionsData",
    };
    const result = await Moralis.executeFunction(options);

    setPendingTransactionData(result);
  };
  const handleGetPendingAddOwnerData = async () => {
    const options = {
      abi: walletContractJson.abi,
      contractAddress: params.selectedSafe,
      functionName: "pendingAddOwnerData",
    };
    const result = await Moralis.executeFunction(options);
    setPendingAddOwnerData(result);
  };
  const handleGetPendingUpdatethresholdData = async () => {
    const options = {
      abi: walletContractJson.abi,
      contractAddress: params.selectedSafe,
      functionName: "pendingUpdatethresholdData",
    };
    const result = await Moralis.executeFunction(options);

    setPendingUpdatethresholdData(result);
  };

  const handleGetPendingRemoveOwnerData = async () => {
    const options = {
      abi: walletContractJson.abi,
      contractAddress: params.selectedSafe,
      functionName: "pendingRemoveOwnerData",
    };
    try {
      const result = await Moralis.executeFunction(options);

      setPendingRemoveOwnerData(result);
      setLoadPendingData(false);
    } catch (error) {}
  };

  const handleApprovalTransaction = async (index) => {
    const options = {
      abi: walletContractJson.abi,
      contractAddress: params.selectedSafe,
      functionName: "transactionApproval",
      params: {
        _index: index,
      },
    };
    const result = await Moralis.executeFunction(options);
  };

  const handleApprovalToRemoveAnOwner = async (index) => {
    const options = {
      abi: walletContractJson.abi,
      contractAddress: params.selectedSafe,
      functionName: "removeOwnerApproval",
      params: {
        _index: index,
      },
    };
    const result = await Moralis.executeFunction(options);
    console.log(result);
  };

  const handleApprovalToUpdateQuorum = async (index) => {
    const options = {
      abi: walletContractJson.abi,
      contractAddress: params.selectedSafe,
      functionName: "updatethresholdApproval",
      params: {
        _index: index,
      },
    };
    const result = await Moralis.executeFunction(options);
    console.log(result);
  };

  const handleApprovalToAddAnOwner = async (index) => {
    const options = {
      abi: walletContractJson.abi,
      contractAddress: params.selectedSafe,
      functionName: "addOwnerApproval",
      params: {
        _index: index,
      },
    };
    const result = await Moralis.executeFunction(options);
    console.log(result);
  };

  const handleRefetchPendingApprovals = () => {
    if (isWeb3Enabled) {
      handleGetPendingTransactionData();
      handleGetPendingAddOwnerData();
      handleGetPendingUpdatethresholdData();
      handleGetPendingRemoveOwnerData();
    }
  };

  return (
    <div className={styles.wallet_manager}>
      <Container>
        {loading ? (
          <LinearProgress />
        ) : (
          <div className={styles.wallet_manager_content}>
            <WalletDetail
              walletBalance={walletBalance}
              threshold={threshold}
              totalOwners={totalOwners}
              ownersAddr={ownersAddr}
            />
            <div className={styles.existing_approvals}>
              <button>REQUESTS</button>
            </div>
            <div className={styles.wallet_cards}>
              <Grid container spacing={4}>
                <Grid item sm={6} md={4} xs={12}>
                  <AppCard
                    placeholder1={"Value(ETH)"}
                    placeholder2={"Value(ETH)"}
                    handleChange={handleChange}
                    title={"Deposit funds"}
                    description={"Deposit funds(ETH) into wallet"}
                    name1={"ethFunds"}
                    name2={"name2"}
                    handleCardAction={handleDepositFunds}
                  />
                </Grid>
                <Grid item sm={6} md={4} xs={12}>
                  <AppCard
                    placeholder1={"Receiver's address"}
                    placeholder2={"Amount(ETH)"}
                    handleChange={handleChange}
                    title={"Request a transaction"}
                    description={
                      "Request a transaction to be approved by other owners"
                    }
                    name1={"name1"}
                    name2={"name2"}
                    handleCardAction={handleRequestTransaction}
                  />
                </Grid>
                <Grid item sm={6} md={4} xs={12}>
                  <AppCard
                    placeholder1={"Address to remove"}
                    placeholder2={"Amount(ETH)"}
                    handleChange={handleChange}
                    title={"Request to remove an owner"}
                    description={
                      "Make request to remove a wallet address as an owner of this wallet"
                    }
                    name1={"name1"}
                    name2={"name2"}
                    handleCardAction={handleRequestToRemoveAnOwner}
                  />
                </Grid>
                <Grid item sm={6} md={4} xs={12}>
                  <AppCard
                    placeholder1={"new quorum"}
                    placeholder2={"Amount(ETH)"}
                    handleChange={handleChange}
                    title={"Request to update quorum"}
                    description={"Make request to update quorum"}
                    name1={"name1"}
                    name2={"name2"}
                    handleCardAction={handleRequestToUpdateQuorum}
                  />
                </Grid>
                <Grid item sm={6} md={4} xs={12}>
                  <AppCard
                    placeholder1={"Address to add"}
                    placeholder2={"Amount(ETH)"}
                    handleChange={handleChange}
                    title={"Request to add an owner"}
                    description={
                      "Make request to add an owner(address) to the wallet"
                    }
                    name1={"name1"}
                    name2={"name2"}
                    handleCardAction={handleRequestToAddAnOwner}
                  />
                </Grid>
              </Grid>
            </div>
            <div className={styles.existing_approvals}>
              <button>APPROVALS</button>
              <button onClick={handleRefetchPendingApprovals}>
                Click to update pending approvals
              </button>
            </div>
            <div className={styles.wallet_approval_cards}>
              <div className={styles.wallet_approval_cards_heading}>
                <Typography>Transactions</Typography>
              </div>
              {pendingTrx.length == 0 ? (
                <Typography>No pending request for Transaction</Typography>
              ) : (
                <Grid container spacing={4}>
                  {pendingTrx.map((data) => {
                    return (
                      <Grid key={data.index} item sm={6} md={4} xs={12}>
                        <PendingCard
                          handleCardAction={handleApprovalTransaction}
                          title={"Transaction Request"}
                          data={data}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </div>
            <div className={styles.wallet_approval_cards}>
              <div className={styles.wallet_approval_cards_heading}>
                <Typography>Quorum</Typography>
              </div>
              {quorum.length == 0 ? (
                <Typography>No pending request for Quorum</Typography>
              ) : (
                <Grid container spacing={4}>
                  {quorum.map((data) => {
                    return (
                      <Grid key={data.index} item sm={6} md={4} xs={12}>
                        <PendingCard
                          handleCardAction={handleApprovalToUpdateQuorum}
                          title={"Quorum Request"}
                          data={data}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </div>
            <div className={styles.wallet_approval_cards}>
              <div className={styles.wallet_approval_cards_heading}>
                <Typography>Add owner</Typography>
              </div>
              {addOwner.length == 0 ? (
                <Typography>No pending request for adding owner</Typography>
              ) : (
                <Grid container spacing={4}>
                  {addOwner.map((data) => {
                    return (
                      <Grid key={data.index} item sm={6} md={4} xs={12}>
                        <PendingCard
                          handleCardAction={handleApprovalToAddAnOwner}
                          title={"Add owner Request"}
                          data={data}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </div>
            <div className={styles.wallet_approval_cards}>
              <div className={styles.wallet_approval_cards_heading}>
                <Typography>Remove owner</Typography>
              </div>
              {rmOwner.length == 0 ? (
                <Typography>No pending request for removing owner</Typography>
              ) : (
                <Grid container spacing={4}>
                  {rmOwner.map((data) => {
                    return (
                      <Grid key={data.index} item sm={6} md={4} xs={12}>
                        <PendingCard
                          handleCardAction={handleApprovalToRemoveAnOwner}
                          title={"Remove owner Request"}
                          data={data}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </div>
          </div>
        )}
      </Container>
      {isApprovalModalShowing && (
        <AppBackdrop
          child={
            <ApprovalModal
              setLoadPendingData={setLoadPendingData}
              loadPendingData={loadPendingData}
              pendingTransactionData={pendingTransactionData}
              pendingAddOwnerData={pendingAddOwnerData}
              pendingRemoveOwnerData={pendingRemoveOwnerData}
              pendingUpdatethresholdData={pendingUpdatethresholdData}
              handleGetPendingTransactionData={handleGetPendingTransactionData}
              handleGetPendingAddOwnerData={handleGetPendingAddOwnerData}
              handleGetPendingRemoveOwnerData={handleGetPendingRemoveOwnerData}
              handleGetPendingUpdatethresholdData={
                handleGetPendingUpdatethresholdData
              }
            />
          }
          handleCloseModal={handleToggleApprovalModal}
          openModal={handleToggleApprovalModal}
        />
      )}
    </div>
  );
};

export default WalletManager;
