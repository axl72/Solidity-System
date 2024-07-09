import QRCode from "qrcode.react";
import PropTypes from "prop-types";

export const QRComponent = ({
  fishmealBatchKilograms,
  processor_name,
  fishmealBatchExist,
  fishmealBatchCreatedAt,
  anchovyBatchKilograms,
  enterprise,
  fishingArea,
  anchovyBatchExist,
  anchovyBatchCreatedAt,
  distributor,
  createdAt,
  packagesCount,
  fishmealBatchId,
  anchovyBatchId,
  fishmealPackageId,
}) => {
  const url = `/details?distributor=${encodeURIComponent(
    distributor
  )}&fishmealBatchKilograms=${encodeURIComponent(
    fishmealBatchKilograms
  )}&processor_name=${encodeURIComponent(
    processor_name
  )}&fishmealBatchExist=${encodeURIComponent(
    fishmealBatchExist
  )}&fishmealBatchCreatedAt=${encodeURIComponent(
    fishmealBatchCreatedAt
  )}&anchovyBatchKilograms=${encodeURIComponent(
    anchovyBatchKilograms
  )}&enterprise=${encodeURIComponent(
    enterprise
  )}&fishingArea=${encodeURIComponent(
    fishingArea
  )}&anchovyBatchExist=${encodeURIComponent(
    anchovyBatchExist
  )}&anchovyBatchCreatedAt=${encodeURIComponent(
    anchovyBatchCreatedAt
  )}&createdAt=${encodeURIComponent(
    createdAt
  )}&packagesCount=${encodeURIComponent(
    packagesCount
  )}&fishmealBatchId=${encodeURIComponent(
    fishmealBatchId
  )}&anchovyBatchId=${encodeURIComponent(
    anchovyBatchId
  )}&fishmealPackageId=${encodeURIComponent(fishmealPackageId)}`;
  return (
    <>
      {/* ?distributor=${encodeURIComponent(distributor)}&fishmealId=${encodeURIComponent(fishmealId)}&packagesCount=${encodeURIComponent(packagesCount)}&createdAt=${encodeURIComponent(createdAt)}&exist=${encodeURIComponent(exist)}`} */}
      <QRCode value={url} />
      <a href={url}>Link del QR</a>
    </>
  );
};

QRComponent.propTypes = {
  fishmealBatchKilograms: PropTypes.number.isRequired,
  processor_name: PropTypes.string.isRequired,
  fishmealBatchExist: PropTypes.bool.isRequired,
  fishmealBatchCreatedAt: PropTypes.string.isRequired,
  anchovyBatchKilograms: PropTypes.number.isRequired,
  enterprise: PropTypes.string.isRequired,
  fishingArea: PropTypes.string.isRequired,
  anchovyBatchExist: PropTypes.bool.isRequired,
  anchovyBatchCreatedAt: PropTypes.string.isRequired,
  distributor: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  packagesCount: PropTypes.number.isRequired,
  fishmealBatchId: PropTypes.number.isRequired,
  anchovyBatchId: PropTypes.number.isRequired,
};
