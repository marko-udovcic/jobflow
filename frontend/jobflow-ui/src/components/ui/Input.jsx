const variants = {
  primary: `bg-[var(--color-input-bg)] border-color-primary h-[2.9rem] rounded-[2rem] focus:ring-1 focus:ring-[#0e0e0e] focus:outline-none p-2`,
};
function Input({ type, className, variant, name, value, onChange }) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      className={`${className} ${variants[variant]}`}
    />
  );
}

export default Input;
