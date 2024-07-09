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

  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/menu");
  };

  return (
    <>
      <section className="details-view">
        <main>
          <h1>Detalles del producto</h1>
          <label htmlFor="">
            Cantidad de kilogramos del Lote Harina de pescado:
            <span>{fishmealBatchKilograms}</span>
          </label>
          <label htmlFor="">Nombre de la Planta Procesadora:</label>
          <span>{processor_name}</span>
          <label>Existencia del Lote:</label>
          <span>{fishmealBatchExist.toString()}</span>
          <label htmlFor="">Fecha de creación del Lote de Harina:</label>
          <span>{fishmealBatchCreatedAt.toString()}</span>
          <label htmlFor="">
            Cantidad de kilogramos del Lote de Anchovetas:
            <span>{anchovyBatchKilograms}</span>
          </label>
          <label htmlFor="">Empresa pesquera:</label>
          <span>{enterprise}</span>
          <label htmlFor="">
            Lugar donde fue pescado el lote de anchovetas
          </label>
          <span>{fishingArea}</span>
          <label htmlFor="">Existencia del lote de anchovetas: </label>
          <span>{anchovyBatchExist.toString()}</span>
          <label htmlFor="">Fue pescado: </label>
          <span>{anchovyBatchCreatedAt.toString()}</span>
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
