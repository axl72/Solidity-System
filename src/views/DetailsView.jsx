import { useLocation, useNavigate } from "react-router-dom";

export const DetailsView = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fishmealBatchKilograms = Number(
    queryParams.get("fishmealBatchKilograms")
  );
  const processor_name = queryParams.get("processor_name");
  const fishmealBatchExist = queryParams.get("fishmealBatchExist") === "true";
  const fishmealBatchCreatedAt = queryParams.get("fishmealBatchCreatedAt");
  const anchovyBatchKilograms = Number(
    queryParams.get("anchovyBatchKilograms")
  );
  const enterprise = queryParams.get("enterprise");
  const fishingArea = queryParams.get("fishingArea");
  const anchovyBatchExist = queryParams.get("anchovyBatchExist") === "true";
  const anchovyBatchCreatedAt = queryParams.get("anchovyBatchCreatedAt");
  const distributor = queryParams.get("distributor");
  const createdAt = queryParams.get("createdAt");
  const packagesCount = Number(queryParams.get("packagesCount"));
  const fishmealBatchId = Number(queryParams.get("fishmealBatchId"));
  const anchovyBatchId = Number(queryParams.get("anchovyBatchId"));
  const fishmealPackageId = Number(queryParams.get("fishmealPackageId"));

  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/menu");
  };

  return (
    <>
      <section className="details-view">
        <main>
          <h1>Detalles del producto</h1>
          <header>LOTE DE ANCHOVETA</header>{" "}
          <label htmlFor="">
            Código del lote de anchoveta:{" "}
            <span>{`anchovy-batch-${anchovyBatchId}`}</span>
          </label>
          <label htmlFor="">
            Cantidad de kilogramos del Lote de Anchovetas:
            <span>{`${anchovyBatchKilograms} Kg.`}</span>
          </label>
          <label htmlFor="">Empresa pesquera:</label>
          <span>{enterprise}</span>
          <label htmlFor="">
            Lugar donde fue pescado el lote de anchovetas
          </label>
          <span>{fishingArea}</span>
          <label htmlFor="">Fue pescado: </label>
          <span>{anchovyBatchCreatedAt.toString()}</span>
          <label htmlFor="">Existencia del lote de anchovetas: </label>
          <span>{anchovyBatchExist.toString()}</span>
          <header>LOTE DE HARINA DE PESCADO</header>
          <label htmlFor="">
            Codigo del lote de harina:{" "}
            <span>{`fishmeal-batch-${fishmealBatchId}`}</span>
          </label>
          <label htmlFor="">
            Kilogramos del Lote Harina de pescado:
            <span>{`${fishmealBatchKilograms} Kg.`}</span>
          </label>
          <label htmlFor="">Planta Procesadora:</label>
          <span>{processor_name}</span>
          <label>Existencia del Lote:</label>
          <span>{fishmealBatchExist.toString()}</span>
          <label htmlFor="">Fecha de creación del Lote de Harina:</label>
          <span>{fishmealBatchCreatedAt.toString()}</span>
          <header>PAQUETES DE HARINA</header>
          <label htmlFor="">
            Código del lote de paquetes:{" "}
            <span>{`fishmeal-packages-${fishmealPackageId}`}</span>
          </label>
          <label htmlFor="">Empresa distribuidora</label>
          <span>{distributor}</span>
          <label htmlFor="">Este producto fue distribuido: </label>
          <span>{createdAt.toString()}</span>
          <label htmlFor="">
            Cantidad de productos pertenecientes al lote:
            <span>{packagesCount}</span>
          </label>
          <button onClick={handleOnClick}>Regresar al Menú</button>
        </main>
      </section>
    </>
  );
};
