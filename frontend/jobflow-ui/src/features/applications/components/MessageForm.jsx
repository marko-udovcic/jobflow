import PropTypes from "prop-types";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import CompoundModal from "../../../components/ui/CompoundModal";
import { ModalContext } from "../../../components/ui/CompoundModal";
import moment from "moment";
import { useContext } from "react";
function MessageForm({
  isEmployer = true,
  messageFromEmployer = "Default Message",
  message = "",
  setMessage = "",
}) {
  const { close } = useContext(ModalContext);

  return (
    <div>
      {isEmployer && (
        <>
          <label className="mb-1 ml-1">Message</label>
          <Input
            name="message"
            type="textarea"
            variant={"fullHeightTextarea"}
            placeholder="Please enter Message For Worker or use default message (Click Just Save Button)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=""
          />
        </>
      )}

      {!isEmployer && (
        <div>
          <h2 className="mb-3 text-2xl">Message</h2>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5">
            <p className="text-black-color">Email: {messageFromEmployer.employerEmail}</p>
            <p className="text-[15px] font-semibold">
              {moment(messageFromEmployer.sentDate).format("MMMM Do YYYY, h:mm a")}
            </p>
          </div>
          <p>{messageFromEmployer.content}</p>
        </div>
      )}

      <div className="flex justify-end gap-5">
        <CompoundModal.Close>
          <Button variant="cancel" className={"lg:1/2 mt-6 w-1/2 p-2 xl:w-1/2 2xl:w-1/4"}>
            {isEmployer ? "Cancel" : "Close"}
          </Button>
        </CompoundModal.Close>
        {isEmployer && (
          <Button
            variant="primary"
            className={"lg:1/2 mt-6 w-1/2 xl:w-1/2 2xl:w-1/4"}
            onClick={close}
          >
            {message.trim().length === 0 ? "Save Message" : "Saved"}
          </Button>
        )}
      </div>
    </div>
  );
}

MessageForm.propTypes = {
  isEmployer: PropTypes.bool,
  messageFromEmployer: PropTypes.string,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default MessageForm;
