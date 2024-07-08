import QRCode from "qrcode.react";

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
  )},&fishingArea=${encodeURIComponent(
    fishingArea
  )},&anchovyBatchExist=${encodeURIComponent(
    anchovyBatchExist
  )},&anchovyBatchCreatedAt=${encodeURIComponent(
    anchovyBatchCreatedAt
  )},&createdAt=${encodeURIComponent(
    createdAt
  )},&packagesCount=${encodeURIComponent(packagesCount)}`;
  return (
    <>
      {/* ?distributor=${encodeURIComponent(distributor)}&fishmealId=${encodeURIComponent(fishmealId)}&packagesCount=${encodeURIComponent(packagesCount)}&createdAt=${encodeURIComponent(createdAt)}&exist=${encodeURIComponent(exist)}`} */}
      <QRCode value={url} />
      <a href={url}>Link del QR</a>
    </>
  );
};
