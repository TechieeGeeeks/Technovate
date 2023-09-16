import { useState, useEffect } from "react";
const { ethers } = require("ethers");
const {
  MyTokenContractAddress,
  ReliefDaoContractAddress,
} = require("../contract_instances/config");

const SecureYourself = ({
  signer,
  account,
  provider,
  contractMyToken,
  contractRelief,
}) => {
  const [balance, setBalance] = useState(null);
  const [address, setAddress] = useState("");
  const [nameToken, setNameToken] = useState("");
  const [symbolToken, setSymbolToken] = useState("");
  const [trustAddress, setTrustAddress] = useState();
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    async function fetchBalance() {
      try {
        // Call the balanceOf function to retrieve the balance of the target address
        const address1 = await signer.getAddress();
        const tokenName = await contractMyToken.name();
        const tokenSymbol = await contractMyToken.symbol();
        const balance = await contractMyToken.balanceOf(address1);
        setAddress(address1);
        setBalance(balance);
        setNameToken(tokenName);
        setSymbolToken(tokenSymbol);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (signer) {
      fetchBalance();
      yourTrustWorthyParty();
    }
  }, [signer]);

  const permit = async () => {};

  const yourTrustWorthyParty = async () => {
    console.log(signer.getAddress());
    const address = await contractMyToken.brother(signer.getAddress());
    setTrustAddress(address);
  };
  const addTrustWorthy = async (event) => {
    event.preventDefault();
    await contractMyToken.addbrother(inputValue);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="md:pb-36 h-screen flex mt-16 justify-center w-full text-lightModeTextColor">
      <div className=" md:w-1/2 w-[85%] rounded-lg h-1/2 border md:p-16 p-4 flex flex-col items-start justify-center">
        <p className=" md:text-xl text-lg">
          Token Name:{" "}
          <span className="font-semibold text-lightPrimary">{nameToken}</span>
        </p>
        <p className=" md:text-xl text-lg">
          Token symbol:{" "}
          <span className="font-semibold text-lightPrimary">{symbolToken}</span>
        </p>
        <p className="md:text-xl text-lg">
          Your Wallet Address:{" "}
          <span className="font-semibold text-lightPrimary break-all">
            {address}
          </span>
        </p>
        {balance !== null ? (
          <p className=" md:text-xl text-lg">
            Your Total Balance:{" "}
            <span className="font-semibold text-lightPrimary">
              {ethers.utils.formatEther(balance)}
            </span>
          </p>
        ) : (
          <p className="font-semibold text-lightPrimary">Loading balance...</p>
        )}

        {trustAddress !== "0x0000000000000000000000000000000000000000" ? (
          <p>Your trust Address is : {trustAddress}</p>
        ) : (
          <div className="flex flex-col">
            <p className=" md:text-2xl text-lg mt-2">Not added any Trustworthy</p>
            <form onSubmit={addTrustWorthy}>
              
                <input
                  className="text-black w-full p-3 rounded-lg bg-transparent border border-lightPrimary"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Enter Trustworthy addressing"
                />
           
              <button type="submit" className="p-4 bg-lightPrimary rounded-lg mt-2 text-darkBg">Add Trust Worthy</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureYourself;
