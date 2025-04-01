import PropTypes from "prop-types";

function JobDetailRow({ children }) {
  return <div className="mb-3 flex flex-row items-center gap-1">{children}</div>;
}

JobDetailRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default JobDetailRow;
