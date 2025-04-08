import PropTypes from "prop-types";

function FlexRowItem({ leftItem = "default", children = "default" }) {
  return (
    <div className="mb-3 flex flex-col lg:flex-row lg:gap-5">
      <div>
        <p className="">{leftItem}</p>
      </div>
      <div className="flex w-full flex-col lg:w-[70%]">{children}</div>
    </div>
  );
}

FlexRowItem.propTypes = {
  leftItem: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
};

export default FlexRowItem;
