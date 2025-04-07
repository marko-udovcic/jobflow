import PropTypes from "prop-types";
import CvListItem from "./CvListItem";

function CvReusableList({ list, removeItem, renderItem }) {
  return (
    <div className="ml-2">
      {list.map((item, index) => (
        <CvListItem key={index} index={index} content={renderItem(item)} onRemove={removeItem} />
      ))}
    </div>
  );
}

CvReusableList.propTypes = {
  list: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default CvReusableList;
