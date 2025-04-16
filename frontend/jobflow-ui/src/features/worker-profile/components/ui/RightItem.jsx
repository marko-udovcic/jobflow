import PropTypes from "prop-types";

function RightItem({ title, subtitle, description }) {
  const renderDescriptionLines = () => {
    if (!description) return null;

    if (description.includes("-")) {
      const lines = description.split("- ").filter((line) => line.trim() !== "");

      return (
        <div className="mt-2 space-y-1">
          {lines.map((line, index) => (
            <p key={index} className="text-[15px]">
              {line}
            </p>
          ))}
        </div>
      );
    }

    return <p>{description}</p>;
  };

  return (
    <div className="mb-4">
      <p className="font-semibold">{title}</p>
      <p className="text-black-color">{subtitle}</p>
      {renderDescriptionLines()}
    </div>
  );
}

RightItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default RightItem;
