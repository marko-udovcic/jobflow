const variants = {
  primary: `bg-[#0e0e0e] text-white
      rounded-[20px]`,
  secondary: `bg-white text-black
      rounded-[20px]`,
};

function Card({ children, variant = "primary", className }) {
  return <div className={`${variants[variant]} ${className}`}>{children}</div>;
}

export default Card;
