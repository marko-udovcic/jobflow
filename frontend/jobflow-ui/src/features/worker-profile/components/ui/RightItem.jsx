import PropTypes from "prop-types";

function RightItem({ title, subtitle, description }) {
  return (
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-black-color">{subtitle}</p>
      <p>{description}</p>
    </div>
  );
}

RightItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default RightItem;
