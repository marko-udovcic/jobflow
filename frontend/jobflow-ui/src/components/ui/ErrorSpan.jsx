import PropTypes from "prop-types";

function ErrorSpan({ showError, name, labelName = null }) {
  return showError(name) ? (
    <span className="text-[14px] text-red-600">{showError(name)}</span>
  ) : (
    labelName
  );
}

ErrorSpan.propTypes = {
  showError: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  labelName: PropTypes.string,
};

export default ErrorSpan;
