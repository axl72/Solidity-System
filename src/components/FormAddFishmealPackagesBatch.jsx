import { FishmealBatchSelector } from "./FishmealBatchSelector";
import PropTypes from "prop-types";
import MyContractArtifact from "../../public/FishmealTraceability.json";
import { Web3 } from "web3";
import { useForm } from "../hooks/useForm";
import { useState } from "react";

export const FormAddFishmealPackagesBatch = ({
  isOpen,
  handleModalOnClose,
  account,
}) => {
  const { distributor, packagesCount, onChange } = useForm({
    distributor: "",
    packagesCount: "",
  });
  const [fishmealBatchId, setFishmealBatchId] = useState(0);

  const handleOnRegister = async () => {
    event.preventDefault();
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = await MyContractArtifact.networks[networkId];
    const abi = await MyContractArtifact.abi;
    const address = await deployedNetwork.address;
    const contract = new web3.eth.Contract(abi, address);

    await contract.methods
      .createFishmealPackages(fishmealBatchId, distributor, packagesCount)
      .send({ from: account });
    window.location.reload();
  };

  return (
    <dialog open={isOpen}>
      <FishmealBatchSelector
        fishmealBatchId={fishmealBatchId}
        setFishmealBatchId={setFishmealBatchId}
      />
      <input
        type="text"
        placeholder="Distribuidora"
        name="distributor"
        value={distributor}
        onChange={onChange}
      />
      <input
        type="number"
        placeholder="Cantidad de paquetes"
        name="packagesCount"
        value={packagesCount}
        onChange={onChange}
      />
      <button onClick={handleOnRegister}>Registrar</button>
      <button onClick={handleModalOnClose}>Cerrar Modal</button>
    </dialog>
  );
};

FormAddFishmealPackagesBatch.propTypes = {
  isOpen: PropTypes.bool,
  handleModalOnClose: PropTypes.func.isRequired,
  account: PropTypes.string.isRequired,
};
