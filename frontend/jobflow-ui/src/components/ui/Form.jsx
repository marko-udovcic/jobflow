import PropTypes from "prop-types";

function Form({ children, className, onSubmit }) {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
