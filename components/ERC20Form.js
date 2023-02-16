import { useCallback, useEffect, useState } from "react";


const IS_INVALID = "is-invalid";
const IS_VALID = "is-valid";

const Erc20Form = ({ web3, accounts, StorageABI }) => {
  const [addressErc20, setAddressErc20] = useState("");
  const [balanceToken, setBalanceToken] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [addressToSend, setAddressToSend] = useState("");
  const [weiToSend, setWeiToSend] = useState(0);
  const [contract, setContract] = useState(0);
  const [decimals, setDecimals] = useState(0);
  const [addressErrorCSS, setAddressErrorCSS] = useState(IS_INVALID);

  /**
   * Initialisation du formulaire ERC20 à chaque fois que l'adresse change
   */
  useEffect(() => {
    initContract();
  }, [addressErc20]);

  /**
   * Initialisation lorsque le contract est modifié
   */
  useEffect(() => {
    initBalance();
    initSymbol();
    initDecimals();
  }, [contract]);

  /**
   * Initialisation du Contract
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
   * Initialiser le Symbol
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
   * Initialiser les Décimales
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
   * Initialiser la balance de l'utilisateur
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
   * Envoyer des Token
   * @type {(function(): Promise<void>)|*}
   */
  const sendToken = useCallback(async () => {
    const tokenToSend = web3.utils.toWei(weiToSend.toString(), "ether");
    await contract.methods
      .transfer(addressErc20, tokenToSend)
      .send({ from: accounts[0] });

    initBalance();
  }, [addressErc20]);

  /**
   * Rendu JSX
   */
  return (
    <div className={"container"}>
      <h2>WCS Token</h2>

      <p>
        Amount EduToken: <span>{balanceToken / 10 ** decimals}</span> {symbol}
      </p>

      <div className="row">
        <div className={"col-6"}>
          <div className="row">
            <label className="col-4 col-form-label">Address Erc20:</label>
            <div className={"col-8 p-0"}>
              <input
                className={`form-control ${addressErrorCSS}`}
                type="text"
                onChange={(e) => {
                  setAddressErc20(e.target.value);
                }}
                value={addressErc20}
              />
            </div>
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
  );
};

export default Erc20Form;
