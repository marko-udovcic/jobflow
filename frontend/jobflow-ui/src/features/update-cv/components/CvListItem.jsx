import PropTypes from "prop-types";
import Button from "../../../components/ui/Button";

function CvListItem({ index, content, onRemove }) {
  return (
    <div key={index} className="mt-3 mb-3 flex items-center gap-5">
      <p>{content}</p>
      <Button variant="danger" className="!mt-0" onClick={() => onRemove(index)}>
        Remove
      </Button>
    </div>
  );
}

CvListItem.propTypes = {
  index: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CvListItem;
