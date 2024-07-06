import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useContext, useEffect } from "react";
import { AuthContext } from "../hooks/AuthContext";

export const Login = () => {
  const { inputUsername, inputPassword, onChange } = useForm({
    inputUsername: "",
    inputPassword: "",
  });
  const { login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOnSubmit = () => {
    event.preventDefault();
    console.log(inputPassword);
    console.log(inputUsername);
    if (inputUsername === "admin" && inputPassword === "1234") {
      login({ username: inputUsername, role: "anchovy_admin" });
      sessionStorage.setItem("token", "logged");
      navigate("/menu");
    } else if (inputUsername === "admin2" && inputPassword === "1234") {
      login({ username: inputUsername, role: "fishmeal_admin" });
      sessionStorage.setItem("token", "logged");
      navigate("/menu");
    } else if (inputUsername === "admin3" && inputPassword === "1234") {
      login({ username: inputUsername, role: "fishmeal_package_admin" });
      sessionStorage.setItem("token", "logged");
      navigate("/menu");
    }
  };

  useEffect(() => {
    sessionStorage.removeItem('token')

    sessionStorage.removeItem('userdata')
    logout()
  });
  return (
    <>
      <div className=".container">
        <div className="flex-container">
          <header className="header-login">CLIENTE BLOCKCHAIN</header>
          <form
            onSubmit={handleOnSubmit}
            className=" login-form flex-container form-container"
          >
            <p>
              Inicia sesión con tu usuario para acceder a todas las
              funcionaldiades de la aplicación
            </p>
            <input
              type="text"
              name="inputUsername"
              placeholder="Username"
              value={inputUsername}
              onChange={onChange}
            />
            <input
              type="password"
              name="inputPassword"
              value={inputPassword}
              placeholder="Password"
              onChange={onChange}
            />
            <button>CONECTARSE</button>
          </form>
        </div>
      </div>
      <aside className="right-art">
        <img src="../../public/img/combined-shape.svg" alt="" />
      </aside>
    </>
  );
};
