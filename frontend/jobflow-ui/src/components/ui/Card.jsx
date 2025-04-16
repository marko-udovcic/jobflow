const variants = {
  primary: `bg-[#0e0e0e] text-white
      rounded-[20px]`,
  secondary: `bg-white text-black
      rounded-[20px]`,
  none: "",
};

import PropTypes from "prop-types";

function Card({ children, variant = "primary", className }) {
  return <div className={`${variants[variant]} ${className}`}>{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  className: PropTypes.string,
};

export default Card;
