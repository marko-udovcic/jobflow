import { useContext } from "react";
import CompoundModal from "../../../components/ui/CompoundModal";
import Form from "../../../components/ui/Form";
import InputLabelField from "../../../components/ui/InputLabelField";
import Button from "../../../components/ui/Button";
import PropTypes from "prop-types";
import { useApplyForm } from "../hooks/useApplyForm";
import { ModalContext } from "../../../components/ui/CompoundModal";
import { useAddJobApplication } from "../hooks/useAddJobApplication";
function ApplyJobModal({ jobPostingId }) {
  const { close } = useContext(ModalContext);
  const { createJobApplication } = useAddJobApplication();
  const handleSubmit = (values) => {
    const data = {
      jobPostingId,
      ...values,
      content: values.content.trim() || "No additional details provided",
    };
    close();
    createJobApplication(data);
  };

  const { formik, showError } = useApplyForm(handleSubmit);
  return (
    <div className="rounded-2xl bg-white p-4 shadow-lg">
      <Form onSubmit={formik.handleSubmit}>
        <InputLabelField
          name="jobPosition"
          labelName="Job position"
          type="text"
          formik={formik}
          showError={showError}
          placeholder="Programmer, Teacher ..."
        />
        <InputLabelField
          name="content"
          labelName="Message"
          type="textarea"
          inputVariant="fullHeightTextarea"
          formik={formik}
          showError={showError}
          placeholder="Feel free to add any additional information to share with employer"
        />
        <p className="mb-3 text-center text-[#D30802]">
          Note: By clicking Send, your digital CV will be automatically sent to the employer
        </p>
        <div className="mb-5 flex flex-row justify-end gap-4">
          <CompoundModal.Close>
            <Button variant="cancel" className={"lg:1/2 mt-6 w-full xl:w-1/2 2xl:w-1/4"}>
              Cancel
            </Button>
          </CompoundModal.Close>

          <Button
            variant="primary"
            className="lg:1/2 mt-6 w-full xl:w-1/2 2xl:w-1/4"
            type={"submit"}
          >
            Send Application
          </Button>
        </div>
      </Form>
    </div>
  );
}
ApplyJobModal.propTypes = {
  jobPostingId: PropTypes.string.isRequired,
};
export default ApplyJobModal;
