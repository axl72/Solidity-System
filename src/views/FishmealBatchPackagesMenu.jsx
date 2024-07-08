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

  return (
    <>
      <header className="fishmeal-packages-header">
        <main>
          <span className="wallet-section">Wallet</span>
          <strong>{accountState}</strong>
        </main>
        <button className="logout-button menu-button" onClick={handleOnLogout}>
          Logout
        </button>
      </header>
      <section className="packages-menu-section">
        <div className="packages-batch-button-container">
          <button
            className="add-packages-batch-button"
            onClick={handleModalOnOpen}
          >
            Agregar Lote de Paquetes
          </button>
        </div>
        <FormAddFishmealPackagesBatch
          isOpen={modalState}
          handleModalOnClose={handleModalOnClose}
          account={accountState}
        />
        <section className="packages-section">
          {fishmealPackages.map(
            ({
              id,
              distributor,
              // fishmealBatchId,
              initPackagesId,
              finalPackagesId,
              packagesCount,
              createdAt,
              exist,
            }) => {
              return (
                <FishmealPackagesCard
                  key={id}
                  distributor={distributor}
                  fishmealBatchId={id}
                  initPackagesId={initPackagesId}
                  finalPackagesId={finalPackagesId}
                  packagesCount={packagesCount}
                  createdAt={createdAt}
                  exist={exist}
                />
              );
            }
          )}
        </section>
      </section>
    </>
  );
};
