import { useState, createContext, useContext, cloneElement } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

export const ModalContext = createContext();

function CompoundModal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = (name) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>
  );
}
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: (e) => {
      children.props.onClick?.(e);
      open(opensWindowName);
    },
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 backdrop-blur-[8px] z-[1000]">
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-6 rounded-lg
          shadow-lg"
      >
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

CompoundModal.Open = Open;
CompoundModal.Window = Window;

CompoundModal.propTypes = {
  children: PropTypes.node,
};

Open.propTypes = {
  children: PropTypes.element.isRequired,
  opens: PropTypes.string.isRequired,
};

Window.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
};

export default CompoundModal;
