import { useState } from "react";
import PropTypes from "prop-types";
import SectionTitle from "./SectionTitle";
import Form from "../../../components/ui/Form";
import InputLabelField from "../../../components/ui/InputLabelField";
import CvReusableList from "./CvReusableList";
import Button from "../../../components/ui/Button";
import { useFormWithStorage } from "../hooks/useFormWithStorage";
import { experienceSchema } from "../schema/experienceSchema";
import { initialValues } from "../schema/experienceSchema";
import FormRowFields from "../../../components/ui/FormRowFields";
import ToggleButton from "./ToggleButton";
import { useStoredData } from "../hooks/useStoredData";
function ExperienceForm({ onUpdate, storedExperience }) {
  const [isOpen, setIsOpen] = useState(true);
  const localStorageKey = "experienceList";
  const {
    formik,
    removeItem: removeExperience,
    list: experienceList,
    setList,
    showError,
  } = useFormWithStorage(localStorageKey, experienceSchema, onUpdate, initialValues);
  useStoredData(localStorageKey, storedExperience, setList);
  const renderExperienceItem = (experience) => {
    return `${experience.jobTitle} , ${experience.companyName} (${experience.dateRange})`;
  };
  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`my-3 flex items-center justify-between ${!isOpen ? "rounded-3xl bg-black text-white" : ""}`}
      >
        <SectionTitle title="Work Experience" className={`${!isOpen ? "p-1" : ""}`} />
        <ToggleButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      </div>

      {isOpen && (
        <>
          <CvReusableList
            list={experienceList}
            renderItem={renderExperienceItem}
            removeItem={removeExperience}
          />
          <Form onSubmit={formik.handleSubmit}>
            <InputLabelField
              name="jobTitle"
              labelName="Job Title"
              type="text"
              formik={formik}
              showError={showError}
              placeholder="Job Title"
            />
            <FormRowFields>
              <InputLabelField
                name="companyName"
                labelName="Company Name"
                formik={formik}
                placeholder="Company Name"
                showError={showError}
              />
              <InputLabelField
                name="location"
                labelName="Location(City, Country)"
                type="text"
                placeholder="City, Country"
                formik={formik}
                showError={showError}
              />
            </FormRowFields>

            <InputLabelField
              name="dateRange"
              labelName="Start Date - End Date"
              type="text"
              formik={formik}
              showError={showError}
              placeholder="e.g( January 2024 - January 2025) or (January 2024 - Present)"
            />
            <InputLabelField
              name="summary"
              labelName="Summary"
              type="textarea"
              inputVariant="fullHeightTextarea"
              formik={formik}
              placeholder="Provide a brief summary of what was done at that company or leave it blank"
              showError={showError}
            />
            <div className="flex justify-end">
              <Button variant="primary" className="mt-6 w-full lg:w-1/4" type={"submit"}>
                Add Experience
              </Button>
            </div>
          </Form>
        </>
      )}
    </div>
  );
}
ExperienceForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  storedExperience: PropTypes.array,
};

export default ExperienceForm;
