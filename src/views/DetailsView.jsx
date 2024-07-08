import { useLocation } from "react-router-dom";

export const DetailsView = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // fishmealBatchKilograms,
  // processor_name,
  // fishmealBatchExist,
  // fishmealBatchCreatedAt,
  // anchovyBatchKilograms,
  // enterprise,
  // fishingArea,
  // anchovyBatchExist,
  // anchovyBatchCreatedAt,
  // distributor,
  // createdAt,
  // packagesCount,
  const fishmealBatchKilograms = Number(
    queryParams.get("fishmealBatchKilograms")
  );
  const processor_name = queryParams.get("processor_name");
  const fishmealBatchExist = queryParams.get("fishmealBatchExist") === "true";
  const fishmealBatchCreatedAt = new Date(
    Number(queryParams.get("fishmealBatchCreatedAt")) * 1000
  );
  const anchovyBatchKilograms = Number(
    queryParams.get("anchovyBatchKilograms")
  );
  const enterprise = queryParams.get("enterprise");
  const fishingArea = queryParams.get("fishingArea");
  const anchovyBatchExist = queryParams.get("anchovyBatchExist") === "true";
  const anchovyBatchCreatedAt = new Date(
    Number(queryParams.get("anchovyBatchCreatedAt")) * 1000
  );
  const distributor = queryParams.get("distributor");
  const createdAt = new Date(queryParams.get("createdAt"));
  const packagesCount = Number(queryParams.get("packagesCount"));

  return (
    <>
      <main>
        <span>{fishmealBatchKilograms}</span>
        <span>{processor_name}</span>
        <span>{fishmealBatchExist.toString()}</span>
        <span>{fishmealBatchCreatedAt.toString()}</span>
        <span>{anchovyBatchKilograms}</span>
        <span>{enterprise}</span>
        <span>{fishingArea}</span>
        <span>{anchovyBatchExist.toString()}</span>
        <span>{anchovyBatchCreatedAt.toString()}</span>
        <span>{distributor}</span>
        <span>{createdAt.toString()}</span>
        <span>{packagesCount}</span>
      </main>
    </>
  );
};
