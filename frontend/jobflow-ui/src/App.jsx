import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useCurrentUser } from "./features/auth/hooks/useCurrentUser";
function App() {
  const { isLoading } = useCurrentUser();
  const location = useLocation();
  const hideNavbarPaths = ["/worker/update-cv"];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="app-container">
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Outlet />
    </div>
  );
}

export default App;
