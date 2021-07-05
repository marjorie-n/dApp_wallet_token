import { useState, useCallback, useEffect } from "react";
import Head from "next/head";
//import Image from "next/image";
//import logo from '../asset/logo.webp'

import Web3 from "web3";

import StorageABI from "../contract/storage.json";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";


export default function Home() {
  const [isConnectedWeb3, setIsConnectedWeb3] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(0);
  const [web3] = useState(
    new Web3(Web3.givenProvider || "ws://localhost:8545")
  );
  const [weiToSend, setWeiToSend] = useState(0);
  const [addressToSend, setAddressToSend] = useState("");
  const [balanceToken, setBalanceToken] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [addressErc20, setAddressErc20] = useState("");
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
    const chainId = web3.currentProvider.chainId
    let network

    switch (chainId) {
      case '0x1':
        network = 'Ethereum'
        break
      case '0x2a':
        network = 'Kovan'
        break
      case '0x3':
        network = 'Ropsten'
        break
      case '0x4':
        network = 'Rinkeby'
        break
      case '0x5':
        network = 'Goerli'
        break
      default:
        break
    }
    return network
  }

  const sendEth = useCallback(async () => {
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: addressToSend,
      value: web3.utils.toWei(weiToSend,"ether"),
    });
  }, [accounts, addressToSend, weiToSend]);

  const storageContract = new web3.eth.Contract(
    StorageABI,
    "0xe5d6d7e2680284baA6DAA837b052e23309F5667F"
    );

  const sendToken = useCallback(async () => {
    //store variable
    const tokenToSend = web3.utils.toWei(weiToSend,"ether")
    await storageContract.methods
      .transfer(addressErc20, tokenToSend)
      .send({ from: accounts[0] });
      //setToken(web3.utils.fromWei((await weiToSend ).toString(), "Ether"));
  }, [accounts, addressErc20, weiToSend]);

  // connect contract EduToken //
  useEffect(() => {
    const storageContract = new web3.eth.Contract(
      StorageABI,
      "0xe5d6d7e2680284baA6DAA837b052e23309F5667F"
    );

    // get  balance token with Metamask//
    const setBalance = async () => {
      //setBalanceToken(web3.utils.fromWei(balanceToken, 'ether'))
      //await storageContract.methods.balanceOf(accounts[0]).call()
      const balanceToken = await storageContract.methods
        .balanceOf(accounts[0])
        .call();
      const wallet = web3.utils.fromWei(balanceToken, "ether");
      setBalanceToken(wallet)
    };

    const getSymbol = async () => {
      setSymbol(await storageContract.methods.symbol().call());
    };
    setBalance();
    getSymbol();
  }, [accounts, balanceToken, symbol]);

  /* const sendNewNumber = useCallback(
    async () => {
      const storageContract = new web3.eth.Contract(
        StorageABI,
        "0xe5d6d7e2680284baA6DAA837b052e23309F5667F"
      )
  
      await storageContract.methods.store(numberInput).send({from: accounts[0]})
    },
    [accounts, numberInput]
  ) */

  return (
    <div className={styles.container}>
      <Head>
        <title>Wallet dApp</title>
        <meta name="description" content="Wallet dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main  className={styles.main}>
        {isConnectedWeb3 ? (
        <p></p>
        ) : (
          //<p><a target="_blank"><Image src={logo} alt='Etherscan' className={styles.imgEth}/></a></p>//
          <button className="btn btn-secondary btn-lg" onClick={connectToWeb3}>
            Connect to web3
          </button>
        )}
        <div className="float-right">{getNetwork()}</div>
        <h1 className={styles.title}>Wallet dApp</h1>
        <p>My Address Wallet: {accounts[0]}</p>
        <p>Amount Ether: {balance}Eth</p>
        <div className="row g-3 align-items-center">
        <div className="form-group">
        <label for="inputPassword6" class="col-form-label">Address: </label>
        <input
          type="text"
          onChange={(e) => setAddressToSend(e.target.value)} value={addressToSend}
        />
        </div>
        <br></br>
        <div className="form-group">
        <label for="inputPassword6" class="col-form-label">Amount:</label>
        <input
          type="number"
          onChange={(e) => setWeiToSend(e.target.value)} value={weiToSend}
        />
        </div>
        </div>
        <br></br>
        <button type="button" className="btn-sub" onClick={sendEth}>
          Send
        </button>
        <br></br><br></br>
        <p>Amount EduToken: <span>{balanceToken}</span> {symbol}</p>
        <div className="row g-3 align-items-center">
        <div className="form-group">
        <labe for="inputPassword6" class="col-form-label">Address Erc20: </labe>
        <input type="text"  onChange={(e) =>setAddressErc20(e.target.value)} value={addressErc20}  />
        </div>
        <br></br>
        <div className="form-group">
        <label for="inputPassword6" class="col-form-label">Address:</label>
        <input
          type="text"
          onChange={(e) => setAddressToSend(e.target.value)} value={addressToSend}
        />
        </div>
        <br></br>
        <div className="form-group">
        <label for="inputPassword6" class="col-form-label">Amount:</label>
        <input
          type="number"
          onChange={(e) => setWeiToSend(e.target.value)} value={weiToSend}
        />
        </div>
        </div>
        <br></br>
        <button type="button" className="btn-sub" onClick={sendToken}>
          Send
        </button>
      </main>
      <footer className={styles.footer}>
        <a
          href=""
          rel="noreferrer"
          target="_blank"
        >
          My Github link
        </a>
      </footer>
      </div>
  );
}
