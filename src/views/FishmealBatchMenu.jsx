import { useEffect, useState } from "react";
import { AnchovyBatchIdSelector } from "../components/AnchovyBatchIdSelector";
import { FishmealBatchList } from "../components/FishmealBatchList";
import { useNavigate } from "react-router-dom";
import { Web3 } from "web3";

import MyContractArtifact from "../../public/FishmealTraceability.json";
import { useForm } from "../hooks/useForm";

export const FishmealBatchMenu = () => {
  const navigate = useNavigate();
  const handleOnLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userdata");
    navigate("/login");
  };
  const [accountState, setAccountState] = useState("");
  const { kilograms, processorName, onChange } = useForm({
    kilograms: "",
    processorName: "",
  });
  const [anchovyBatchId, setAnchovyBatchId] = useState(0);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = await MyContractArtifact.networks[networkId];
    const abi = await MyContractArtifact.abi;
    const address = await deployedNetwork.address;
    const contract = new web3.eth.Contract(abi, address);

    await contract.methods
      .createFishmealBatch(kilograms * 100, processorName, anchovyBatchId)
      .send({ from: accountState });
    window.location.reload();
  };

  //Todo: reemplazar toda es función por un hook personalizado
  useEffect(() => {
    const setupWeb3Provider = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        const account = accounts[0];
        setAccountState(account || "No account found");
      }
    };

    setupWeb3Provider();
  }, []);

  return (
    <>
      <header className="fishmeal-menu-header">
        <section className="wallet-section">
          <span>Wallet</span>
          <strong>{accountState}</strong>
        </section>
        <button className="logout-button menu-button" onClick={handleOnLogout}>
          Logout
        </button>
      </header>
      <section className="menu-section">
        <main>
          <form
            action=""
            onSubmit={handleOnSubmit}
            className="flex-column fishmeal-form"
          >
            <header>Registra un Lote de Harina</header>
            <input
              type="text"
              name="processorName"
              value={processorName}
              onChange={onChange}
              placeholder="Nombre de la procesadora"
            />
            <input
              type="number"
              name="kilograms"
              value={kilograms}
              onChange={onChange}
              placeholder="Cantidad de Kilogramos: 978.56"
            />
            <AnchovyBatchIdSelector
              anchovyBatchId={anchovyBatchId}
              setAnchovyBatchId={setAnchovyBatchId}
            />
            <button>Registrar</button>
          </form>
        </main>
        <aside className="fishmeal-list">
          <FishmealBatchList />
        </aside>
      </section>
    </>
  );
};
