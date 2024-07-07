import PropTypes from "prop-types";
export const FishmealCard = ({ procesorName, kilograms, createdAt, exist }) => {
  return (
    <>
      <article className="itemlist-card">
        <strong>{procesorName}</strong>
        <span>{kilograms}</span>
        <span>{createdAt}</span>
        <span>{exist}</span>
      </article>
    </>
  );
};

FishmealCard.propTypes = {
  procesorName: PropTypes.string.isRequired,
  kilograms: PropTypes.number.isRequired,
  createdAt: PropTypes.object.isRequired,
  exist: PropTypes.bool.isRequired,
};
