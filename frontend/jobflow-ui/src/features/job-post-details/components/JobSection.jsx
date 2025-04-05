import PropTypes from "prop-types";

function JobSection({ className = "", title = "", content = "", list = false }) {
  const formattedContent = list
    ? content.split("\n").map((line, index) => (
        <li className="font-secondary text-paragraph-text text-lg font-normal" key={index}>
          {line}
        </li>
      ))
    : content;

  return (
    <div>
      <h2 className="mb-3">{title}</h2>
      {list ? (
        <ul className={`list-disc pl-5 ${className} mb-3`}>{formattedContent}</ul>
      ) : (
        <p className={`whitespace-pre-wrap ${className} mb-3`}>{formattedContent}</p>
      )}
    </div>
  );
}
JobSection.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  list: PropTypes.bool,
};

export default JobSection;
