import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../../components/ui/Button";
import { educationSchema } from "../schema/educationSchema";
import { initialValues } from "../schema/educationSchema";
import InputLabelField from "../../../components/ui/InputLabelField";
import { useFormWithStorage } from "../hooks/useFormWithStorage";
import Form from "../../../components/ui/Form";
import CvReusableList from "./CvReusableList";
import SectionTitle from "./SectionTitle";
import ToggleButton from "./ToggleButton";
function EducationForm({ onUpdate }) {
  const [isOpen, setIsOpen] = useState(true);
  const localStorageKey = "educationList";
  const {
    formik,
    removeItem: removeEducation,
    list: educationList,
    showError,
  } = useFormWithStorage(localStorageKey, educationSchema, onUpdate, initialValues);

  const renderEducationItem = (education) => {
    return `${education.degree} (${education.dateRange})`;
  };

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`my-3 flex items-center justify-between ${!isOpen ? "rounded-3xl bg-black text-white" : ""}`}
      >
        <SectionTitle title="Education" className={`${!isOpen ? "p-1" : ""}`} />
        <ToggleButton isOpen={isOpen} />
      </div>

      {isOpen && (
        <>
          <CvReusableList
            list={educationList}
            renderItem={renderEducationItem}
            removeItem={removeEducation}
          />
          <Form onSubmit={formik.handleSubmit}>
            <InputLabelField
              name="degree"
              labelName="Degree, School or University"
              type="text"
              formik={formik}
              showError={showError}
              placeholder="Degree, School or University"
            />
            <InputLabelField
              name="dateRange"
              labelName="Start Date - End Date"
              type="text"
              formik={formik}
              showError={showError}
              placeholder="Start Date Year - End Date Year( January 2024 - January 2025)"
            />

            <div className="flex justify-end">
              <Button variant="primary" className="mt-6 w-full lg:w-1/4" type={"submit"}>
                Add Education
              </Button>
            </div>
          </Form>
        </>
      )}
    </div>
  );
}
EducationForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default EducationForm;
