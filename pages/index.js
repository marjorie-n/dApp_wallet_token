import { useState, useCallback, useEffect } from "react";
import Head from "next/head";

import Web3 from "web3";

import StorageABI from "../contract/storage.json";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";

const IS_INVALID = "is-invalid";
const IS_VALID = "is-valid";

export default function Home() {
  const [isConnectedWeb3, setIsConnectedWeb3] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(0);

  const [web3] = useState(
    new Web3(Web3.givenProvider || "ws://localhost:8545")
  );
  const [weiToSend, setWeiToSend] = useState(0);
  const [contract, setContract] = useState(0);
  const [decimals, setDecimals] = useState(18);
  const [addressToSend, setAddressToSend] = useState("");
  const [balanceToken, setBalanceToken] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [addressErc20, setAddressErc20] = useState("");
  const [addressErrorCSS, setAddressErrorCSS] = useState(IS_INVALID);

  //log in to Metamask (wallet)
  const connectToWeb3 = useCallback(async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        setIsConnectedWeb3(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Install Metamask");
    }
  });

  // connect to Smart Contract
  useEffect(() => {
    // Accounts
    const getAccounts = async () => setAccounts(await web3.eth.getAccounts());
    const getBalance = async () => {
      const changeWei = web3.eth.getBalance(accounts[0]);
      setBalance(web3.utils.fromWei((await changeWei).toString(), "Ether"));
    };

    if (accounts.length == 0) getAccounts();
    if (accounts.length > 0) getBalance();
  }, [isConnectedWeb3, accounts]);

  //display the connected mainnet
  const getNetwork = () => {
    const chainId = web3.currentProvider.chainId;
    let network;

    switch (chainId) {
      case "0x1":
        network = "Ethereum";
        break;
      case "0x2a":
        network = "Kovan";
        break;
      case "0x3":
        network = "Ropsten";
        break;
      case "0x4":
        network = "Rinkeby";
        break;
      case "0x5":
        network = "Goerli";
        break;
      default:
        break;
    }
    return network;
  };

  const sendEth = useCallback(async () => {
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: addressToSend,
      value: web3.utils.toWei(weiToSend, "ether"),
    });
  }, [accounts, addressToSend, weiToSend]);

  const storageContract = new web3.eth.Contract(
    StorageABI,
    "0xe5d6d7e2680284baA6DAA837b052e23309F5667F"
  );

  /**
   * Initialization form ERC20 every time the address changes
   */
  useEffect(() => {
    initContract();
  }, [addressErc20]);

  /**
   * Initialization when the contract is modified
   */
  useEffect(() => {
    initBalance();
    initSymbol();
    initDecimals();
  }, [contract]);

  /**
   * Initialization Contract
   */
  const initContract = () => {
    if (addressErc20 && addressErc20 != "") {
      try {
        const newContract = new web3.eth.Contract(StorageABI, addressErc20);
        setContract(newContract);
        setAddressErrorCSS(IS_VALID);
      } catch (error) {
        console.error(error);
        setAddressErrorCSS(IS_INVALID);
      }
    }
  };

  /**
   * Initialize Symbol
   */
  const initSymbol = async () => {
    if (addressErc20 && addressErc20 != "" && contract) {
      const newSymbol = await contract.methods
        .symbol()
        .call({ from: accounts[0] });
      setSymbol(newSymbol);
    }
  };

  /**
   * Initialize Décimals
   */
  const initDecimals = async () => {
    if (addressErc20 && addressErc20 != "" && contract) {
      const newDecimals = await contract.methods
        .decimals()
        .call({ from: accounts[0] });
      setDecimals(newDecimals);
    }
  };

  /**
   * Initialize balance user
   */
  const initBalance = async () => {
    if (addressErc20 && addressErc20 != "" && contract) {
      const newBalance = await contract.methods
        .balanceOf(accounts[0])
        .call({ from: accounts[0] });
      setBalanceToken(newBalance);
    }
  };

  /**
   * Send Token
   * @type {(function(): Promise<void>)|*}
   */

  const sendToken = useCallback(async () => {
    //store variable
    const tokenToSend = web3.utils.toWei(weiToSend, "ether");
    await storageContract.methods
      .transfer(addressErc20, tokenToSend)
      .send({ from: accounts[0] });
  }, [accounts, addressErc20, weiToSend]);

  // connect contract EduToken //
  useEffect(() => {
    const storageContract = new web3.eth.Contract(
      StorageABI,
      "0xe5d6d7e2680284baA6DAA837b052e23309F5667F"
    );

    // get  balance token with Metamask//
    const setBalance = async () => {
      console.log(accounts);
      if (accounts.length > 0) {
        const balanceToken = await storageContract.methods
          .balanceOf(accounts[0])
          .call();
        const balanceEthToken = web3.utils.fromWei(balanceToken, "ether");
        setBalanceToken(balanceEthToken);
      }
    };

    const getSymbol = async () => {
      setSymbol(await storageContract.methods.symbol().call());
    };
    setBalance();
    getSymbol();
  }, [accounts, balanceToken, symbol]);

  /**
   * Rendering JSX
   */

  return (
    <div className={styles.container}>
      <Head>
        <title>Wallet dApp</title>
        <meta charset="utf-8" />
        <meta name="description" content="Wallet dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!isConnectedWeb3 ? (
          <button className="btn btn-secondary btn-lg" onClick={connectToWeb3}>
            Connect to web3
          </button>
        ) : (
          <button className="btn btn-secondary btn-lg disabled" disabled>
            {getNetwork()}
          </button>
        )}

        <div className={"container mb-5"}>
          <h1>Wallet dApp</h1>
          <p>My Address Wallet: {accounts[0]}</p>
          <p>
            Amount Ether: {balance / 10 ** decimals} {symbol}
          </p>

          <div className={"row"}>
            <div className={"col-sm-6"}>
              <div className="row mt-2">
                <label className="col-4 col-form-label">Address: </label>
                <div className={"col-8 p-0"}>
                  <input
                    className={"form-control"}
                    type="text"
                    onChange={(e) => setAddressToSend(e.target.value)}
                    value={addressToSend}
                  />
                </div>
              </div>

              <div className="row mt-2">
                <label className="col-4 col-form-label">Amount:</label>
                <div className={"col-8 p-0"}>
                  <input
                    className={"form-control"}
                    type="number"
                    onChange={(e) => setWeiToSend(e.target.value)}
                    value={weiToSend}
                  />
                </div>
              </div>

              <div className={"text-end"}>
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={sendEth}
                >
                  Send
                </button>
              </div>

              <h2>WCS Token</h2>
              <p>
                Amount EduToken: <span>{balanceToken / 10 ** decimals}</span>{" "}
                {symbol}
              </p>

              <div className="row">
                <div className={"col-sm-6"}>
                  <div className="row mt-2">
                    <label className="col-4 col-form-label">
                    Erc20 address:
                    </label>
                    <div className={"col-8 p-0"}>
                      <input
                        className={`form-control ${addressErrorCSS}`}
                        type="text"
                        onChange={(e) => setAddressErc20(e.target.value)}
                        value={addressErc20}
                      />
                    </div>

                    <div className="row mt-2">
                      <label className="col-4 col-form-label">Address:</label>
                      <div className={"col-8 p-0"}>
                        <input
                          className={"form-control"}
                          type="text"
                          onChange={(e) => setAddressToSend(e.target.value)}
                          value={addressToSend}
                        />
                      </div>
                    </div>

                    <div className="row mt-2">
                      <label className="col-4 col-form-label">Amount:</label>
                      <div className={"col-8 p-0"}>
                        <input
                          className={"form-control"}
                          type={"number"}
                          onChange={(e) => setWeiToSend(e.target.value)}
                          value={weiToSend}
                        />
                      </div>
                    </div>

                    <div className={"text-end mt-3"}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={sendToken}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="card text-center">
        <div className="card-header">
          <a
            href="https://github.com/Margotte83/dApp_wallet_token"
            rel="noreferrer"
            target="_blank"
          >
            My Github link
          </a>
        </div>
      </div>
    </div>
  );
}
