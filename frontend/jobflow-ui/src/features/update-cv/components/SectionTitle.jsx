import PropTypes from "prop-types";

function SectionTitle({ title, className = "" }) {
  return <h2 className={`my-3 text-2xl ${className}`}>{title}</h2>;
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SectionTitle;
