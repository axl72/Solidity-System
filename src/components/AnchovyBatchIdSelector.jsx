import { useFetchAnchovy } from "../hooks/useFetchAnchovy";
import PropTypes from "prop-types";

export const AnchovyBatchIdSelector = ({
  anchovyBatchId,
  setAnchovyBatchId,
}) => {
  const { anchovyBatches } = useFetchAnchovy();
  const handleOnChange = ({ target }) => {
    const { value } = target;
    setAnchovyBatchId(Number(value));
    console.log("valor: ", value);
  };
  return (
    <>
      <select value={anchovyBatchId} name="" id="" onChange={handleOnChange}>
        <option value={0}>LOTE DE ANCHOVETA</option>
        {anchovyBatches.map(
          ({ id, enterprise, kilograms, fishingArea, createdAt, exist }) => (
            <option key={id} value={Number(id)}>
              {`${enterprise} ${kilograms} ${createdAt} ${exist} ${fishingArea}`}
            </option>
          )
        )}
      </select>
    </>
  );
};

AnchovyBatchIdSelector.propTypes = {
  anchovyBatchId: PropTypes.number.isRequired,
  setAnchovyBatchId: PropTypes.func.isRequired,
};
