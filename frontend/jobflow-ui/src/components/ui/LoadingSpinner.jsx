import PropTypes from "prop-types";

function LoadingSpinner({ message = "Loading data..." }) {
  return (
    <div className="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}

LoadingSpinner.propTypes = {
  message: PropTypes.string,
};

export default LoadingSpinner;
