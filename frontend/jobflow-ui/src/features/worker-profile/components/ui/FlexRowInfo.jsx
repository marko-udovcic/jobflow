import PropTypes from "prop-types";

function FlexRowInfo({ children }) {
  return <div className="mb-2 flex flex-row items-center gap-2">{children}</div>;
}

FlexRowInfo.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FlexRowInfo;
