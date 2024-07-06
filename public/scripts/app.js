import {Web3} from 'web3';
import MyContractArtifact from '../../public/TasksContract.json';

export class App {
  contract;
  account;
  web3Provider;

  init = async () => {
    console.log("Cargado...");
    await this.loadEthereum();
    await this.loadAccount();
    await this.loadContracts();
  };

  loadEthereum = async () => {
    if (window.ethereum) {
      try {
        this.web3Provider = window.ethereum;
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.error("Error al cargar Ethereum:", error);
      }
    } else {
      console.log("Ningún navegador Ethereum instalado");
    }
  };

  loadContracts = async () => {
    const web3 = new Web3(this.web3Provider);

    try {
      const networkId = await web3.eth.net.getId();
      
      // Obtener la red desplegada del contrato desde el archivo JSON
      const deployedNetwork = MyContractArtifact.networks[networkId];
      this.contract = new web3.eth.Contract(MyContractArtifact.abi, deployedNetwork.address);
      console.log('Valor del contrato: ', this.contract)
    } catch (error) {
      console.error('Error al cargar contrato:', error);
    }
  };

  createTask = async (title, description) => {
    try {

      const result = await this.contract.methods.createTask(title, description).send({
        from: this.account
      });
      console.log('Evento de creación de tarea:', result.events);
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  loadAccount = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      this.account = accounts[0];
    } catch (error) {
      console.error('Error al cargar cuenta:', error);
    }
  };
}
