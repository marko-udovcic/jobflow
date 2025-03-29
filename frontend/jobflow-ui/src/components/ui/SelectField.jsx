import PropTypes from "prop-types";
import ErrorSpan from "./ErrorSpan";

function SelectField({ name, formik, showError, options, labelName }) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor={name} className="ml-2">
        <ErrorSpan showError={showError} name={name} labelName={labelName} />
      </label>
      <select
        id={name}
        name={name}
        value={formik.values[name]}
        className="w-full bg-[var(--color-input-bg)] border-color-primary h-[2.9rem] rounded-[2rem] focus:ring-1
          focus:ring-[#0e0e0e] focus:outline-none p-2"
        onChange={formik.handleChange}
      >
        <option value="">Select a {labelName.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value.id || option.value} value={option.value.id || option.value}>
            {option.value.name || option.value}
          </option>
        ))}
      </select>
    </div>
  );
}
SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  formik: PropTypes.shape({
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
  }).isRequired,
  showError: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  labelName: PropTypes.string.isRequired,
};

export default SelectField;
