// MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainLayout() {
  const location = useLocation();
  const hideNavbarPaths = ["/worker/update-cv"];

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="app-container">
        {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
