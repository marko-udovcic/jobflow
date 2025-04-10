import FlexRowItem from "./ui/FlexRowItem";
import HeadingSection from "./HeadingSection";
import PropTypes from "prop-types";
import RightItem from "./ui/RightItem";
function WorkExperience({ workExperience = [] }) {
  return (
    <div>
      <HeadingSection title="Work Experience" />
      {workExperience.map((item, index) => (
        <FlexRowItem key={`flexRow-${index}`} leftItem={item.dateRange}>
          <RightItem
            key={`rightItem-${item.jobTitle}-${index}`}
            title={item.jobTitle}
            subtitle={`${item.companyName}, ${item.location}`}
            description={item.summary}
          />
        </FlexRowItem>
      ))}
    </div>
  );
}

export default WorkExperience;

WorkExperience.propTypes = {
  workExperience: PropTypes.array,
};
