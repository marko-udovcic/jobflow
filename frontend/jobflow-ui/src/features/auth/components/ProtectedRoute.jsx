import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

const ProtectedRoute = ({ element, allowedRoles = [], requireAuth = true }) => {
  const { isLoading: storeLoading, currentUser } = useAuthStore();
  const isEmptyUser = !currentUser || Object.keys(currentUser).length === 0 || !currentUser.role;

  if (storeLoading) {
    return <div>Loading...</div>;
  }

  if (requireAuth && (currentUser === null || typeof currentUser === "undefined")) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !isEmptyUser && !allowedRoles.includes(currentUser.role)) {
    const error = new Error(`Access denied. Required role: ${allowedRoles.join(" or ")}`);
    error.status = 401;
    console.error(error.message);
    throw error;
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  requireAuth: PropTypes.bool,
};

export default ProtectedRoute;
