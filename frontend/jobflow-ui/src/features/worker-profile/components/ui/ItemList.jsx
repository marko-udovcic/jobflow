import PropTypes from "prop-types";

function ItemList({ list, listAttribute }) {
  return (
    <>
      {list.map((item, index) => (
        <div key={index} className="mb-2 flex flex-col lg:flex-row lg:gap-5">
          <div>
            <p className="">{item[listAttribute]}</p>
          </div>
        </div>
      ))}
    </>
  );
}

ItemList.propTypes = {
  list: PropTypes.array.isRequired,
  listAttribute: PropTypes.string.isRequired,
};

export default ItemList;
