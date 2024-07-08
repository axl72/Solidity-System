import { useEffect, useState } from "react";
import { Web3 } from "web3";
import MyContractArtifact from "../../public/FishmealTraceability.json";

export const useFetchPackages = () => {
  const [fishmealPackages, setFishmealPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFishmealPackages = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3provider = window.ethereum;
      const web3 = new Web3(web3provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = await MyContractArtifact.networks[networkId];

      const abi = await MyContractArtifact.abi;
      const address = await deployedNetwork.address;
      const contract = new web3.eth.Contract(abi, address);
      const fishmeal_packages_batch_counter = await contract.methods
        .fishmeal_package_batch_counter()
        .call();

      const fishmeal_packages_batch_counter_number = parseInt(
        fishmeal_packages_batch_counter
      );
      const newFishmealPackages = [];
      console.log(fishmeal_packages_batch_counter_number)
      for (let i = 1; i <= fishmeal_packages_batch_counter_number; i++) {
        const fishmealPackagesBatch = await contract.methods
        .fishmeal_packages_batches(i)
        .call();
        // console.log(fishmealPackages);
        // console.log(fishmealPackagesBatch)
        const id = fishmealPackagesBatch.id;
        
        const distributor = fishmealPackagesBatch.distributor;
        const fishmealBatchId = fishmealPackagesBatch.fishmeal_batch_id;
        const initPackagesId = fishmealPackagesBatch.init_packages_id;
        const finalPackagesId = fishmealPackagesBatch.final_packages_id;
        const packagesCount = fishmealPackagesBatch.packagesCount;
        const createdAt = fishmealPackagesBatch.createdAt;
        const exist = fishmealPackagesBatch.exist;
        const newFishmealPackagesBatch = {
          id: Number(id),
          distributor,
          fishmealBatchId: Number(fishmealBatchId),
          initPackagesId: Number(initPackagesId),
          finalPackagesId: Number(finalPackagesId),
          packagesCount: Number(packagesCount),
          createdAt: new Date(Number(BigInt(createdAt)*BigInt(1000))).toString(),
          exist,
        };

        newFishmealPackages.push(newFishmealPackagesBatch);
      }
      
      setFishmealPackages(newFishmealPackages);
      setIsLoading(false);
    } catch (error) {
      console.log('Error lanzado')
      console.log(error);
    }
  };

  useEffect(() => {
    getFishmealPackages();

  console.log("Paquetes retornados",fishmealPackages)
  }, []);
  return {
    fishmealPackages,
    isLoading,
  };
};
