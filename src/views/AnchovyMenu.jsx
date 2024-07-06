import { useEffect, useState } from "react";

import { Web3 } from "web3";
import { AnchovyBatchList } from "../components/AnchovyBatchList.jsx";

import MyContractArtifact from "../../public/FishmealTraceability.json";
import { useNavigate } from "react-router-dom";

export const AnchovyMenu = () => {
  const [accountState, setAccount] = useState("");

  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = await MyContractArtifact.networks[networkId];
    const abi = await MyContractArtifact.abi;
    const address = await deployedNetwork.address;
    const contract = new web3.eth.Contract(abi, address);
    const res = await fetch(
      "https://arduino-client-production.up.railway.app/api/data"
    );
    const data = await res.json();
    const { enterprise, kilograms, fishingArea } = data;
    console.log("fishing area: ", fishingArea);
    await contract.methods
      .createAnchovyBatch(enterprise, kilograms * 100, fishingArea)
      .send({ from: accountState });
    window.location.reload();
  };

  const handleOnLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userdata");
    navigate("/login");
  };

  useEffect(() => {
    const setupWeb3Provider = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        const account = accounts[0];
        setAccount(account || "No account found");
      }
    };

    setupWeb3Provider();
  }, []);

  return (
    <>
      <div className="menu-container">
        <header className="header-menu">
          <div>
            <h1>Cliente BlockChain</h1>
            <span className="wallet-container">Wallet </span>
            <span className="wallet-container">{accountState}</span>
          </div>
          <button
            className="logout-button menu-button"
            onClick={handleOnLogout}
          >
            Logout
          </button>
        </header>
        <form onSubmit={handleOnSubmit} className="form-add-anchovy-batch">
          <button className="menu-button">Save</button>
        </form>
        <aside className="list-items">{<AnchovyBatchList />}</aside>
      </div>
    </>
  );
};
