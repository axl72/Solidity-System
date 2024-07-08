import { Menu } from "./views/Menu";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "./views/Login";
import { AuthProvider } from "./hooks/AuthContext";
import { DetailsView } from "./views/DetailsView";

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/menu" element={<Menu />} />
          <Route path={`/details`} element={<DetailsView />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
