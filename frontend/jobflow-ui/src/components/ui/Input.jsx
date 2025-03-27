const variants = {
  primary: `bg-[var(--color-input-bg)] border-color-primary h-[2.9rem] rounded-[2rem] focus:ring-1 focus:ring-[#0e0e0e] focus:outline-none p-2`,
  textarea: ` bg-[var(--color-input-bg)] border-color-primary w-full p-2 border rounded-[1rem] focus:ring-1 focus:ring-[#0e0e0e] focus:outline-none min-h-[5rem]`,
  fullHeightTextarea: `bg-[var(--color-input-bg)] border-color-primary w-full p-2 border rounded-[1rem] focus:ring-1 focus:ring-[#0e0e0e] focus:outline-none min-h-[10rem]`,
};
function Input({ type, className, variant, name, value, onChange }) {
  return (
    <>
      {type === "textarea" ? (
        <textarea
          name={name}
          className={`${className} ${variants[variant]}`}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          className={`${className} ${variants[variant]}`}
        />
      )}
    </>
  );
}

export default Input;
