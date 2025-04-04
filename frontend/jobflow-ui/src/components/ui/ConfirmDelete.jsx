import PropTypes from "prop-types";
import Button from "./Button";
import CompoundModal from "./CompoundModal";
import { ModalContext } from "./CompoundModal";
import { useContext } from "react";
function ConfirmDelete({ onCloseModal, onConfirm, name = "JobPost", isCompoundModal = true }) {
  const { close } = useContext(ModalContext);

  const preventDefault = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDelete = (e) => {
    onConfirm();

    if (isCompoundModal) {
      preventDefault(e);
      close();
    } else {
      onCloseModal();
    }
  };
  return (
    <div>
      <h2 className="text-xl font-semibold">Are you sure that you want delete this {name}?</h2>
      <div className="flex flex-col justify-center lg:flex-row-reverse lg:justify-start">
        <Button variant="danger" onClick={(e) => handleDelete(e)}>
          Delete
        </Button>

        {isCompoundModal ? (
          <CompoundModal.Close>
            <Button
              variant="cancel"
              className="mt-4 p-2 text-black md:w-1/2 md:items-center md:self-center lg:w-1/6 lg:p-2"
              onClick={(e) => {
                preventDefault(e);
              }}
            >
              Cancel
            </Button>
          </CompoundModal.Close>
        ) : (
          <Button className="mt-4 text-black md:w-1/2" onClick={onCloseModal}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

ConfirmDelete.propTypes = {
  onCloseModal: PropTypes.func,
  onConfirm: PropTypes.func,
  name: PropTypes.string,
  isCompoundModal: PropTypes.bool,
};

export default ConfirmDelete;
