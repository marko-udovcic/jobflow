import React from "react";
import PropTypes from "prop-types";

const FormRowFields = ({ children }) => {
  return (
    <div className="flex lg:flex-row lg:gap-5 flex-col">
      {React.Children.map(children, (child, index) => (
        <div key={index} className="lg:w-1/2 w-full">
          {child}
        </div>
      ))}
    </div>
  );
};
FormRowFields.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormRowFields;
