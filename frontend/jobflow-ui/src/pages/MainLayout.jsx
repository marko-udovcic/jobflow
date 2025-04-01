// MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  const location = useLocation();
  const hideNavbarPaths = ["/worker/update-cv"];

  return (
    <div className="app-container">
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Outlet />
    </div>
  );
}

export default MainLayout;
