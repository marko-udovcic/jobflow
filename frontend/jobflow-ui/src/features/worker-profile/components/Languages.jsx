import HeadingSection from "./HeadingSection";
import PropTypes from "prop-types";

function Languages({ languages = [] }) {
  return (
    <div className="mb-3">
      <HeadingSection title="Languages" />
      {languages.map((item, index) => (
        <div key={index} className="mb-2">
          <p>
            {item.languages} - {item.languagesLevel}
          </p>
        </div>
      ))}
    </div>
  );
}
Languages.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      languages: PropTypes.string.isRequired,
      languagesLevel: PropTypes.string.isRequired,
    }),
  ),
};

export default Languages;
