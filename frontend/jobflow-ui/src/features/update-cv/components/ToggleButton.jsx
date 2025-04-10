import { HiChevronUp, HiChevronDown } from "react-icons/hi";
import PropTypes from "prop-types";

const ToggleButton = ({ isOpen, onToggle, size = 30 }) => {
  return (
    <button onClick={onToggle} className="p-2 transition hover:opacity-80">
      {isOpen ? <HiChevronUp size={size} /> : <HiChevronDown size={size} />}
    </button>
  );
};
ToggleButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  size: PropTypes.number,
};

export default ToggleButton;
