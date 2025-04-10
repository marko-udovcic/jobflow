import { useState } from "react";
import PropTypes from "prop-types";
import SectionTitle from "../SectionTitle";
import ToggleButton from "../ToggleButton";
function ExpandableSection({ sectionTitle, children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`my-3 flex items-center justify-between ${!isOpen ? "rounded-3xl bg-black text-white" : ""}`}
      >
        <SectionTitle title={sectionTitle} className={`${!isOpen ? "p-1" : ""}`} />
        <ToggleButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      </div>

      {isOpen && <>{children}</>}
    </div>
  );
}
ExpandableSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ExpandableSection;
