import { useContext, useEffect } from "react";
import { AuthContext } from "../hooks/AuthContext";
import { AnchovyMenu } from "./AnchovyMenu";
import { Navigate } from "react-router-dom";
import { FishmealBatchMenu } from "./FishmealBatchMenu";
import { FishmealBatchPackagesMenu } from "./FishmealBatchPackagesMenu";

export const Menu = () => {
  const token = sessionStorage.getItem("token");
  if (token !== "logged") {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    if (!sessionStorage.getItem("userdata")) {
      sessionStorage.setItem("userdata", JSON.stringify(userData));
    }
  });

  console.log(`${token} !== login = ${token !== "login"}`);

  const menuViews = {
    anchovy_admin: <AnchovyMenu />,
    fishmeal_admin: <FishmealBatchMenu />,
    fishmeal_package_admin: <FishmealBatchPackagesMenu />,
  };

  const userDataCache = JSON.parse(sessionStorage.getItem("userdata"));
  const { userData } = useContext(AuthContext);
  const renderMenu = () =>
    menuViews[userData?.role || userDataCache.role] || <></>;
  return renderMenu();
};
