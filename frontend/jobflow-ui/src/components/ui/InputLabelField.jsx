import Input from "./Input";
import ErrorSpan from "./ErrorSpan";
import PropTypes from "prop-types";
function InputLabelField({ name, labelName, type, formik, showError, inputVariant = "primary" }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="ml-2 block mb-1">
        <ErrorSpan name={name} labelName={labelName} showError={showError} />
      </label>

      <Input
        type={type}
        name={name}
        variant={inputVariant}
        className="w-full"
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && formik.errors[name]}
      />
    </div>
  );
}

InputLabelField.propTypes = {
  name: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  type: PropTypes.string,
  formik: PropTypes.object.isRequired,
  showError: PropTypes.func.isRequired,
  inputVariant: PropTypes.string,
};
export default InputLabelField;
