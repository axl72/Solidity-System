import { useEffect, useState } from "react";
import { Web3 } from "web3";
import MyContractArtifact from "../../public/FishmealTraceability.json";

export const useFetchFishmeal = () => {
  const [fishmealBatches, setFishmealBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFishmealBatches = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3provider = window.ethereum;
      const web3 = new Web3(web3provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = await MyContractArtifact.networks[networkId];
      const abi = await MyContractArtifact.abi;
      const address = await deployedNetwork.address;
      const contract = new web3.eth.Contract(abi, address);
      const fishmeal_batch_counter = await contract.methods
        .fishmeal_batch_counter()
        .call();
      const fishmeal_batch_counter_number = parseInt(fishmeal_batch_counter);
      const newFishmealBatches = [];
      const scaleFactor = await contract.methods.SCALE_FACTOR().call();
      const scaleFactorNumber = await parseInt(scaleFactor);
      for (let i = 1; i <= fishmeal_batch_counter_number; i++) {
        const fishmealBatch = await contract.methods.fishmeal_batches(i).call();
        const id = Number(fishmealBatch.id);
        const processorName = fishmealBatch.processor_name;
        const kilograms =
          BigInt(fishmealBatch.kilograms) / BigInt(scaleFactorNumber);
        const createdAt = new Date(
          Number(BigInt(fishmealBatch.createdAt) * BigInt(1000))
        );
        const exist = fishmealBatch.exits;
        const newAnchovyBatch = {
          id,
          processorName,
          kilograms,
          createdAt,
          exist,
        };
        newFishmealBatches.push(newAnchovyBatch);
      }
      await setFishmealBatches(newFishmealBatches);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al cargar lotes de anchovetas:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  };

  useEffect(() => {
    getFishmealBatches();
  }, []);
  return {
    fishmealBatches,
    isLoading,
  };
};
