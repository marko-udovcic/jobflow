import { Outlet } from "react-router-dom";
import { useCurrentUser } from "./features/auth/hooks/useCurrentUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const { isLoading } = useCurrentUser();
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Outlet />
    </>
  );
}

export default App;
