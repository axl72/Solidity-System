import { useFetchAnchovy } from "../hooks/useFetchAnchovy";

export const AnchovyBatchList = () => {
  const { anchovyBatches, isLoading } = useFetchAnchovy();
  // Aquí puedes realizar cualquier acción necesaria cuando redibujar cambia
  console.log(anchovyBatches);
  return (
    <>
      {anchovyBatches.map(
        ({ id, enterprise, kilograms, fishingArea, createdAt }) => (
          <div key={id} className={`item-list ${isLoading && "loading-items"}`}>
            <h1>{enterprise}</h1>
            <p>{Number(kilograms)}</p>
            <p>{fishingArea}</p>
            <p>{createdAt.toString()}</p>
          </div>
        )
      )}
    </>
  );
};
