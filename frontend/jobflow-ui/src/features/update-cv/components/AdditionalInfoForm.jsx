import InputLabelField from "../../../components/ui/InputLabelField";
import CvReusableList from "./CvReusableList";
import { useFormWithStorage } from "../hooks/useFormWithStorage";
import { additionalInfoSchema } from "../schema/additionalInfoSchema";
import { initialValues } from "../schema/additionalInfoSchema";
import ExpandableSection from "./ui/ExpandableSection";
import Form from "../../../components/ui/Form";
import Button from "../../../components/ui/Button";
import PropTypes from "prop-types";

function AdditionalInfoForm({ onUpdate }) {
  const localStorageKey = "additionalInfoList";
  const {
    formik,
    removeItem,
    list: additionalInfoList,
    showError,
  } = useFormWithStorage(localStorageKey, additionalInfoSchema, onUpdate, initialValues);

  const renderItem = (item) => {
    return `${item.additionalInfo}`;
  };
  return (
    <>
      <ExpandableSection sectionTitle="Additional Information">
        <CvReusableList list={additionalInfoList} renderItem={renderItem} removeItem={removeItem} />
        <Form onSubmit={formik.handleSubmit}>
          <InputLabelField
            name="additionalInfo"
            labelName="Additional Info"
            type="text"
            formik={formik}
            showError={showError}
            placeholder="Enter any additional skills, certifications, or experience..."
          />
          <div className="flex justify-end">
            <Button variant="primary" className="mt-6 w-full lg:w-1/4" type={"submit"}>
              Add Info
            </Button>
          </div>
        </Form>
      </ExpandableSection>
    </>
  );
}

AdditionalInfoForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default AdditionalInfoForm;
