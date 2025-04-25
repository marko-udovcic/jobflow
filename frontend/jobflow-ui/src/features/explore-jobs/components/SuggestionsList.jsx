import PropTypes from "prop-types";

function SuggestionsList({ suggestions, onSuggestionClick, refProp, showSuggestions }) {
  if (!showSuggestions) return null;

  return (
    <div
      ref={refProp}
      className="absolute top-12 right-0 left-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg"
    >
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </div>
        ))
      ) : (
        <div className="px-4 py-2 text-gray-500">Enter more characters for suggestions.</div>
      )}
    </div>
  );
}

SuggestionsList.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSuggestionClick: PropTypes.func.isRequired,
  refProp: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  showSuggestions: PropTypes.bool.isRequired,
};

export default SuggestionsList;
