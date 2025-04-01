import Input from "./Input";
import ErrorSpan from "./ErrorSpan";
import PropTypes from "prop-types";

function InputLabelField({
  name,
  labelName,
  type = "text",
  formik = {},
  showError,
  inputVariant = "primary",
  placeholder = "",
}) {
  const value = formik.values?.[name] || "";
  const handleChange = formik.handleChange || (() => {});
  const handleBlur = formik.handleBlur || (() => {});
  const error = formik.touched?.[name] && formik.errors?.[name];

  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-1 ml-2 block">
        <ErrorSpan name={name} labelName={labelName} showError={showError} />
      </label>

      <Input
        type={type}
        name={name}
        variant={inputVariant}
        className="w-full"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error}
        placeholder={placeholder}
      />
    </div>
  );
}

InputLabelField.propTypes = {
  name: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  type: PropTypes.string,
  formik: PropTypes.object,
  showError: PropTypes.func,
  inputVariant: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputLabelField;
