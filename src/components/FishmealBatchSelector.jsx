import PropTypes from "prop-types";
import { useFetchFishmeal } from "../hooks/useFetchFishmeal";

export const FishmealBatchSelector = ({
  fishmealBatchId,
  setFishmealBatchId,
}) => {
  const { fishmealBatches } = useFetchFishmeal();
  const handleOnChange = ({ target }) => {
    const { value } = target;
    console.log(value);
    setFishmealBatchId(Number(value));
  };

  return (
    <select
      value={fishmealBatchId}
      onChange={handleOnChange}
      className="fishmeal-batch-selector"
    >
      <option value={0}>Selecciona un Lote de Harina</option>
      {fishmealBatches.map(
        ({ id, processorName, kilograms, createdAt, exist }) => (
          <option
            key={id}
            value={id}
          >{`${processorName} ${kilograms} ${createdAt}`}</option>
        )
      )}
    </select>
  );
};

FishmealBatchSelector.propTypes = {
  fishmealBatchId: PropTypes.number.isRequired,
  setFishmealBatchId: PropTypes.func.isRequired,
};
