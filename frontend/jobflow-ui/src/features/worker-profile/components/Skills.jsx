import HeadingSection from "./HeadingSection";
import PropTypes from "prop-types";
import ItemList from "./ui/ItemList";

function Skills({ computerSkills = [], otherSkills = [] }) {
  return (
    <div>
      <HeadingSection title="Computer Skills" />
      <div className="mb-3">
        <ItemList list={computerSkills} listAttribute="skillName" />
      </div>
      <HeadingSection title="Other Skills" />
      <div className="mb-3">
        <ItemList list={otherSkills} listAttribute="skillName" />
      </div>
    </div>
  );
}

Skills.propTypes = {
  computerSkills: PropTypes.arrayOf(
    PropTypes.shape({
      skillName: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
    }),
  ),
  otherSkills: PropTypes.arrayOf(
    PropTypes.shape({
      skillName: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
    }),
  ),
};

export default Skills;
