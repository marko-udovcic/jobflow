import { createPortal } from "react-dom";
import PropTypes from "prop-types";

function Modal({ children, isOpen, onClose, showCloseBtn }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] backdrop-blur-[8px]">
      <div className="bg-secondary border-color-primary bg-body-bg fixed top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform rounded-lg p-6 shadow-lg md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <div>
          {children}
          {showCloseBtn && (
            <button onClick={onClose} className="mt-4 rounded bg-red-500 p-2 text-white">
              Close
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  showCloseBtn: PropTypes.bool,
};

export default Modal;
