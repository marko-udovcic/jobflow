import PropTypes from "prop-types";

function HeadingSection({ title = "Heading" }) {
  return (
    <div className="mb-5 border-b border-[#0E0E0E]/10 py-2">
      <h2>{title}</h2>
    </div>
  );
}

HeadingSection.propTypes = {
  title: PropTypes.string,
};

export default HeadingSection;
