import PropTypes from "prop-types";

export const FishmealPackagesCard = ({
  distributor = "distribuidor",
  fishmealId = 1,
  packagesCount = 1000,
  createdAt = new Date().toISOString(),
  exist = true,
}) => {
  return (
    <article>
      <span>{distributor}</span>
      <span>{fishmealId}</span>
      <span>{packagesCount} </span>
      <span>{createdAt} </span>
      <span>{exist} </span>
      <button>Generar QR</button>
    </article>
  );
};

FishmealPackagesCard.propTypes = {
  distributor: PropTypes.string.isRequired,
  fishmealId: PropTypes.number.isRequired,
  packagesCount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  exist: PropTypes.bool.isRequired,
};
