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
import { useStoredData } from "../hooks/useStoredData";
function EducationForm({ onUpdate, storedEducation }) {
  const [isOpen, setIsOpen] = useState(true);
  const localStorageKey = "educationList";
  const {
    formik,
    removeItem: removeEducation,
    list: educationList,
    setList,
    showError,
  } = useFormWithStorage(localStorageKey, educationSchema, onUpdate, initialValues);

  useStoredData(localStorageKey, storedEducation, setList);
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
              labelName="Degree"
              type="text"
              formik={formik}
              showError={showError}
              placeholder="e.g. Bachelor of Science in Computer Science"
            />

            <InputLabelField
              name="university"
              labelName="University/School"
              type="text"
              formik={formik}
              showError={showError}
              placeholder="e.g. Faculty of Economics, Zagreb, Croatia"
            />
            <InputLabelField
              name="dateRange"
              labelName="Start Date - End Date"
              type="text"
              formik={formik}
              showError={showError}
              placeholder="e.g( January 2024 - January 2025) or (January 2024 - Present)"
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
  storedEducation: PropTypes.arrayOf(
    PropTypes.shape({
      degree: PropTypes.string.isRequired,
      university: PropTypes.string.isRequired,
      dateRange: PropTypes.string.isRequired,
    }),
  ),
};

export default EducationForm;
