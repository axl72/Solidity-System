import { createContext, useState } from 'react';
import PropTypes from 'prop-types'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // Estado local para almacenar el usuario

  const login = (userData) => {
    setUserData(userData); // Función para establecer el usuario después del inicio de sesión
  };

  const logout = () => {
    setUserData(null); // Función para cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.object.isRequired
}
