// ErrorPage.jsx
import { useRouteError, useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaLock, FaExclamationCircle } from "react-icons/fa";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const errorCode =
    error?.status || error?.statusCode || (error?.message?.includes("401") ? 401 : null);
  const errorMessage = error?.data?.message || error?.message || "An unexpected error occurred";

  const getErrorInfo = () => {
    switch (errorCode) {
      case 401:
        return {
          title: "Unauthorized Access",
          icon: <FaLock size={48} className="mx-auto mb-4 text-amber-500" />,
          description:
            "You are not authorized to access this resource. Please log in with the appropriate credentials.",
          primaryAction: "Return to Login",
          primaryPath: "/login",
        };
      case 404:
        return {
          title: "Page Not Found",
          icon: <FaExclamationCircle size={48} className="mx-auto mb-4 text-blue-500" />,
          description: "The page you are looking for does not exist or has been moved.",
        };
      default:
        return {
          title: "Something Went Wrong",
          icon: <FaExclamationTriangle size={48} className="mx-auto mb-4 text-red-500" />,
          description: errorMessage,
        };
    }
  };

  const errorInfo = getErrorInfo();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="mx-auto w-full max-w-lg items-center justify-center self-center rounded-lg bg-white p-8 text-center shadow-md">
        <div className="flex justify-center">{errorInfo.icon}</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-800">{errorInfo.title}</h1>
        <p className="mb-6 text-gray-600">{errorInfo.description}</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          {errorInfo.primaryPath && (
            <button
              onClick={() => navigate(errorInfo.primaryPath)}
              className="rounded-md bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800"
            >
              {errorInfo.primaryAction}
            </button>
          )}
          <button
            onClick={handleGoBack}
            className="rounded-md border border-gray-300 px-6 py-2 transition-colors hover:bg-gray-50"
          >
            Go Back
          </button>
        </div>
        {errorCode && <p className="mt-8 text-sm text-gray-500">Error code: {errorCode}</p>}
      </div>
    </div>
  );
}

export default ErrorPage;
