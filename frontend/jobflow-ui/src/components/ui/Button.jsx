import PropTypes from "prop-types";

const variants = {
  none: "",
  primary: `bg-[#0e0e0e] text-white 
    border-[#0e0e0e] border-1 
    hover:border-[#0e0e0e] hover:border-1
    rounded-[30px] self-center focus:outline-none transition-all px-4 py-2 hover:bg-gray-800
    duration-200 ease-in-out`,

  secondary: `text-black bg-[#edcd59] rounded-[30px] hover:bg-gray-200 active:bg-gray-300 transition 
    duration-500 ease-in-out color-black hover:text-white hover:bg-transparent hover:border-1
    hover:border-[#edcd59] px-4 py-2 font-medium focus:outline-none border border-transparent`,

  danger: `text-red-500 p-2 rounded lg:ml-4 transition duration-500 ease-in-out lg:hover:bg-red-700
            lg:hover:text-white mt-4`,
  disabled: `bg-gray-400 cursor-not-allowed rounded-[30px] py-2 px-2 text-white font-semibold`,
  cancel: `bg-[#F6F6F6] text-[#0E0E0E] rounded-[30px] font-semibold`,
};

export default function Button({ children, onClick, className, disabled, variant = "none", type }) {
  return (
    <button
      onClick={onClick}
      className={`${variants[variant]} ${className} `}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  type: PropTypes.string,
};
