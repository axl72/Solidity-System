import { useEffect, useState } from "react";
import { Web3 } from "web3";
import MyContractArtifact from "../../public/FishmealTraceability.json";

export const useFetchAnchovy = () => {
  const [anchovyBatches, setAnchovyBatchs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Todo: cambiar el nombre
  const getTasks = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3provider = window.ethereum;

      const web3 = new Web3(web3provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = await MyContractArtifact.networks[networkId];
      const abi = await MyContractArtifact.abi;
      const address = await deployedNetwork.address;

      const contract = new web3.eth.Contract(abi, address);
      const anchovy_batch_counter = await contract.methods
        .anchovy_batch_counter()
        .call();
      const anchovy_batch_counter_number = parseInt(anchovy_batch_counter);
      const anchovyBatches = [];
      const scaleFactor = await contract.methods.SCALE_FACTOR().call();
      const scaleFactorNumber = await parseInt(scaleFactor);
      for (let i = 1; i <= anchovy_batch_counter_number; i++) {
        const anchovyBatch = await contract.methods.anchovy_batches(i).call();

        const id = anchovyBatch.id;
        const enterprise = anchovyBatch.enterprise;
        const kilograms =
          BigInt(anchovyBatch.kilograms) / BigInt(scaleFactorNumber);
        const fishingArea = anchovyBatch.fishingArea;
        const createdAt = new Date(
          Number(BigInt(anchovyBatch.createdAt) * BigInt(1000))
        );
        const exist = anchovyBatch.exits;
        const newAnchovyBatch = {
          id,
          enterprise,
          kilograms,
          fishingArea,
          createdAt,
          exist,
        };
        anchovyBatches.push(newAnchovyBatch);
      }
      setAnchovyBatchs(anchovyBatches);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al cargar lotes de anchovetas:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  };

  useEffect(() => {
    //Todo: Cambiar el nombre de esta función y todas sus referencias
    getTasks();
  }, []);

  return {
    anchovyBatches,
    isLoading,
  };
};
