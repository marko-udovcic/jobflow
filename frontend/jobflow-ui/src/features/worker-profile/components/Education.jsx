import HeadingSection from "./HeadingSection";
import FlexRowItem from "./ui/FlexRowItem";
import RightItem from "./ui/RightItem";
import PropTypes from "prop-types";

function Education({ education = [{}] }) {
  return (
    <div>
      <HeadingSection title="Education" />
      {education.map((item, index) => (
        <FlexRowItem key={index} leftItem={item.dateRange}>
          <RightItem title={item.degree} subtitle={item.university || "Not defined"} />
        </FlexRowItem>
      ))}
    </div>
  );
}

Education.propTypes = {
  education: PropTypes.arrayOf(
    PropTypes.shape({
      dateRange: PropTypes.string,
      degree: PropTypes.string,
    }),
  ),
};
export default Education;
