import HeadingSection from "./HeadingSection";
import PropTypes from "prop-types";
function Summary({ summary }) {
  return (
    <div className="mb-5">
      <HeadingSection title="Summary" />
      <p>{summary}</p>
    </div>
  );
}
Summary.propTypes = {
  summary: PropTypes.string.isRequired,
};

export default Summary;
