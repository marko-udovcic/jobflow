import HeadingSection from "./HeadingSection";
import ItemList from "./ui/ItemList";
import PropTypes from "prop-types";
function AdditionalInfo({ additionalInfo = [] }) {
  return (
    <div>
      <HeadingSection title="Additional Information" />
      <div className="mb-3">
        <ItemList list={additionalInfo} listAttribute="additionalInfo" />
      </div>
    </div>
  );
}
AdditionalInfo.propTypes = {
  additionalInfo: PropTypes.array,
};

export default AdditionalInfo;
