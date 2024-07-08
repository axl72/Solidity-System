import PropTypes from "prop-types";
import { useFetchDetails, useModalState } from "../hooks";
import { QRComponent } from "./QRComponent";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const FishmealPackagesCard = ({
  distributor = "distribuidor",
  fishmealBatchId = 1,
  packagesCount = 1000,
  createdAt = new Date().toISOString(),
  exist = true,
}) => {
  const { modalState, handleModalOnOpen, handleModalOnClose } = useModalState();
  const { detailsState } = useFetchDetails(fishmealBatchId);
  return (
    <article className="fishmeal-package-card">
      <div>
        <label htmlFor="">
          Distribuidor <span>{distributor}</span>{" "}
        </label>

        <label htmlFor="">
          Cantidad de paquetes <span>{packagesCount} </span>{" "}
        </label>

        <label htmlFor="">
          Fecha de creación{" "}
          <span>
            {format(createdAt, "EEEE d 'de' MMMM, yyyy 'Hora' HH:mm:ss", {
              locale: es,
            })}{" "}
          </span>{" "}
        </label>

        <label htmlFor="">
          Existencia <span>{exist ? "Sí" : "No"} </span>{" "}
        </label>
      </div>
      <button onClick={handleModalOnOpen}>Generar QR</button>
      <dialog open={modalState}>
        <div className={`modal-qr`}>
          <QRComponent
            fishmealBatchKilograms={detailsState.fishmealBatchKilograms}
            processor_name={detailsState.processor_name}
            fishmealBatchExist={detailsState.fishmealBatchExist}
            fishmealBatchCreatedAt={detailsState.fishmealBatchCreatedAt}
            anchovyBatchKilograms={detailsState.anchovyBatchKilograms}
            enterprise={detailsState.enterprise}
            fishingArea={detailsState.fishingArea}
            anchovyBatchExist={detailsState.anchovyBatchExist}
            anchovyBatchCreatedAt={detailsState.anchovyBatchCreatedAt}
            createdAt={createdAt}
            distributor={distributor}
            packagesCount={packagesCount}
          />
          <button onClick={handleModalOnClose}>Cerrar</button>
        </div>
      </dialog>
      <div className={`${modalState ? "overlay" : ""}`}></div>
    </article>
  );
};

FishmealPackagesCard.propTypes = {
  distributor: PropTypes.string.isRequired,
  fishmealBatchId: PropTypes.number.isRequired,
  packagesCount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  exist: PropTypes.bool.isRequired,
};
