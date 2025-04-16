import PropTypes from "prop-types";
import CompoundModal from "../../../components/ui/CompoundModal";
import MessageForm from "./MessageForm";
import { useState } from "react";

const WorkerActions = ({ worker, workerStatuses, handleSave }) => {
  const [message, setMessage] = useState("");

  return (
    workerStatuses[worker.workerId] !== worker.applicationStatus && (
      <div>
        <CompoundModal>
          <CompoundModal.Open opens="apply-modal">
            <button className="border-black-color/10 mr-5 cursor-pointer rounded border-1 p-1">
              Message
            </button>
          </CompoundModal.Open>
          <CompoundModal.Window name="apply-modal">
            <MessageForm
              status={workerStatuses[worker.workerId]}
              message={message}
              setMessage={setMessage}
            />
          </CompoundModal.Window>
        </CompoundModal>

        <button
          onClick={() => handleSave(worker.workerId, message)}
          className="ml-2 cursor-pointer rounded bg-[#E8FFEF] p-1 text-[#00AD3A]"
        >
          Save
        </button>
      </div>
    )
  );
};

WorkerActions.propTypes = {
  worker: PropTypes.shape({
    workerId: PropTypes.string.isRequired,
    applicationStatus: PropTypes.string.isRequired,
  }).isRequired,
  workerStatuses: PropTypes.objectOf(PropTypes.string).isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default WorkerActions;
