import PropTypes from "prop-types";

function Logo({ className }) {
  return <h1 className={className}>JobFlow.</h1>;
}

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
