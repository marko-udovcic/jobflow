const variants = {
  primary: `bg-[var(--color-input-bg)] border-color-primary h-[2.9rem] rounded-[2rem] focus:ring-1 focus:ring-[#0e0e0e] focus:outline-none p-2`,
  textarea: ` bg-[var(--color-input-bg)] border-color-primary w-full p-2 border rounded-[1rem] focus:ring-1 focus:ring-[#0e0e0e] focus:outline-none min-h-[5rem]`,
  fullHeightTextarea: `bg-[var(--color-input-bg)] border-color-primary w-full p-2 border rounded-[1rem] focus:ring-1 focus:ring-[#0e0e0e] focus:outline-none min-h-[10rem]`,
};
import PropTypes from "prop-types";

function Input({ type, className, variant, name, value, onChange, placeholder = "" }) {
  return (
    <>
      {type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          className={`${className} ${variants[variant]}`}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
          className={`${className} ${variants[variant]}`}
        />
      )}
    </>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "textarea", "fullHeightTextarea"]).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Input;
