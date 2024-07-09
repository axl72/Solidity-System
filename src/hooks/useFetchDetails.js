import { Web3 } from "web3";
import MyContractArtifact from "../../public/FishmealTraceability.json";
import { useEffect, useState } from "react";

export const useFetchDetails = (fishmealBatchId) => {
  const [detailsState, setDetailsState] = useState({});
  const getDetails = async () => {
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

      if (fishmealBatchId > fishmeal_batch_counter_number) {
        return;
      }
      const fishmealBatch = await contract.methods
        .fishmeal_batches(fishmealBatchId)
        .call();
      const { id_anchovy_batch } = fishmealBatch;
      const anchovyBatch = await contract.methods
        .anchovy_batches(Number(id_anchovy_batch))
        .call();

      // Todo: validar los datos de los details

      const {
        id: _fishmealBatchId,
        kilograms: fishmealBatchKilograms,
        processor_name,
        exist: fishmealBatchExist,
        createdAt: fishmealBatchCreatedAt,
      } = fishmealBatch;
      const {
        id: anchovyBatchId,
        kilograms: anchovyBatchKilograms,
        enterprise,
        fishingArea,
        exist: anchovyBatchExist,
        createdAt: anchovyBatchCreatedAt,
      } = anchovyBatch;

      const details = {
        fishmealBatchId: Number(_fishmealBatchId),
        anchovyBatchId: Number(anchovyBatchId),
        fishmealBatchKilograms: Number(fishmealBatchKilograms),
        processor_name,
        fishmealBatchExist,
        fishmealBatchCreatedAt: new Date(
          Number(fishmealBatchCreatedAt) * 1000
        ),
        anchovyBatchKilograms: Number(anchovyBatchKilograms),
        enterprise,
        fishingArea,
        anchovyBatchExist,
        anchovyBatchCreatedAt: new Date(Number(anchovyBatchCreatedAt) * 1000)
      };
      setDetailsState(details);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetails();
  }, []);
  return {

    detailsState,
  };
};
