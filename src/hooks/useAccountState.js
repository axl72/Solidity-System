import { useEffect, useState } from "react";

export const useAccountState = () => {
  const [accountState, setAccountState] = useState("");

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

  return {
    accountState
  }
};
