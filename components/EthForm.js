import { useCallback, useEffect, useState } from "react";
import StorageABI from "../contract/storage.json";

const EthForm = ({ web3, accounts, StorageABI }) => {
  const [balance, setBalance] = useState(0);
  const [decimals, setDecimals] = useState(18);
  const [symbol, setSymbol] = useState("");
  const [addressToSend, setAddressToSend] = useState("");
  const [weiToSend, setWeiToSend] = useState(0);

  useEffect(() => {
    initBalance();
  });

  const initBalance = () => {
    if (web3 && accounts && accounts.length > 0) {
      web3.eth.getBalance(accounts[0]).then((newBalance) => {
        setBalance(newBalance);
      });
    }
  };

  const sendEth = useCallback(async () => {
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: addressToSend,
      value: web3.utils.toWei(weiToSend, "ether"),
    });
  }, [accounts, addressToSend, weiToSend]);

  /**
   * Rendu JSX
   */
  return (
    <div className={"container mb-5"}>
      <h1>Wallet dApp</h1>

      <p>My Address Wallet: {accounts[0]}</p>

      <p>
        Amount: {balance / 10 ** decimals} {symbol}
      </p>

      <div className={"row"}>
        <div className={"col-6"}>
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
        </div>
      </div>
    </div>
  );
};

export default EthForm;
