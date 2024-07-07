import { useFetchFishmeal } from "../hooks/useFetchFishmeal";
import { FishmealCard } from "./FishmealCard";

export const FishmealBatchList = () => {
  const { fishmealBatches } = useFetchFishmeal();
  return (
    <>
      {fishmealBatches.map(
        ({ id, processorName, kilograms, createdAt, exist }) => (
          <FishmealCard
            key={id}
            procesorName={processorName}
            // Todo: la conversión no debe ser acá
            kilograms={Number(kilograms)}
            createdAt={createdAt.toString()}
            exist={exist}
          />
        )
      )}
    </>
  );
};
