import { BiBell } from "react-icons/bi";
import PropTypes from "prop-types";
import CompoundModal from "../../../components/ui/CompoundModal";
import MessageForm from "./MessageForm";
function RenderWorkerMessageStatus({ length, messages = [] }) {
  const messagesLength = messages?.length;
  const employerMessage = messages[messagesLength - 1];
  return (
    <div>
      {length !== 0 ? (
        <CompoundModal>
          <CompoundModal.Open opens="message">
            <BiBell className="text-xl" />
          </CompoundModal.Open>

          <CompoundModal.Window name="message">
            <MessageForm isEmployer={false} messageFromEmployer={employerMessage} />
          </CompoundModal.Window>
        </CompoundModal>
      ) : (
        <span className="text-gray-700">No messages</span>
      )}
    </div>
  );
}

RenderWorkerMessageStatus.propTypes = {
  length: PropTypes.number.isRequired,
  messages: PropTypes.array,
};

export default RenderWorkerMessageStatus;
