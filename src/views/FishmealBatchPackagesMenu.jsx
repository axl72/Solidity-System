import { useNavigate } from "react-router-dom";
import { FormAddFishmealPackagesBatch } from "../components/FormAddFishmealPackagesBatch";
import { useAccountState, useModalState, useFetchPackages } from "../hooks";
import { FishmealPackagesCard } from "../components/FishmealPackagesCard";

export const FishmealBatchPackagesMenu = () => {
  const navigate = useNavigate();
  const handleOnLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userdata");
    navigate("/login");
  };
  const { modalState, handleModalOnOpen, handleModalOnClose } = useModalState();
  const { accountState } = useAccountState();
  const { fishmealPackages } = useFetchPackages();
  console.log(fishmealPackages);

  return (
    <>
      <header>
        <main>
          <span>Wallet</span>
          <span>{accountState}</span>
        </main>
        <button onClick={handleOnLogout}>Logout</button>
      </header>
      <section>
        <button onClick={handleModalOnOpen}>Agregar Lote de Paquetes</button>
        <FormAddFishmealPackagesBatch
          isOpen={modalState}
          handleModalOnClose={handleModalOnClose}
          account={accountState}
        />
        <section>
          {fishmealPackages.map(
            ({
              id,
              distributor,
              fishmealBatchId,
              initPackagesId,
              finalPackagesId,
              packagesCount,
              createdAt,
              exist,
            }) => (
              <FishmealPackagesCard
                key={id}
                distributor={distributor}
                fishmealBatchId={fishmealBatchId}
                initPackagesId={initPackagesId}
                finalPackagesId={finalPackagesId}
                packagesCount={packagesCount}
                createdAt={createdAt}
                exist={exist}
              />
            )
          )}
        </section>
      </section>
    </>
  );
};
