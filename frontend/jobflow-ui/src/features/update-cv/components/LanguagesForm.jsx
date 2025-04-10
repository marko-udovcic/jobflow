import { useState } from "react";
import PropTypes from "prop-types";
import SectionTitle from "./SectionTitle";
import ToggleButton from "./ToggleButton";
import Form from "../../../components/ui/Form";
import FormRowFields from "../../../components/ui/FormRowFields";
import SelectField from "../../../components/ui/SelectField";
import InputLabelField from "../../../components/ui/InputLabelField";
import { languagesSchema } from "../schema/languages";
import { initialValues } from "../schema/languages";
import { useFormWithStorage } from "../hooks/useFormWithStorage";
import Button from "../../../components/ui/Button";
import CvReusableList from "./CvReusableList";

const langugagesLevelOptions = [
  { value: "Basic" },
  { value: "Intermediate" },
  { value: "Advanced" },
  { value: "Native Speaker" },
];

function LanguagesForm({ onUpdate }) {
  const [isOpen, setIsOpen] = useState(true);
  const localStorageKey = "languagesList";
  const {
    formik,
    removeItem: removeLanguages,
    list: languagesList,
    showError,
  } = useFormWithStorage(localStorageKey, languagesSchema, onUpdate, initialValues);

  const renderLanguageItem = (language) => {
    return `${language.languages} (${language.languagesLevel})`;
  };
  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`my-3 flex items-center justify-between ${!isOpen ? "rounded-3xl bg-black text-white" : ""}`}
      >
        <SectionTitle title="Languages" className={`${!isOpen ? "p-1" : ""}`} />
        <ToggleButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      </div>

      {isOpen && (
        <>
          <CvReusableList
            list={languagesList}
            renderItem={renderLanguageItem}
            removeItem={removeLanguages}
          />
          <Form onSubmit={formik.handleSubmit}>
            <FormRowFields>
              <InputLabelField
                name="languages"
                labelName="Languages"
                formik={formik}
                placeholder="Language"
                showError={showError}
              />
              <SelectField
                name="languagesLevel"
                labelName="Language Level"
                formik={formik}
                showError={showError}
                options={langugagesLevelOptions}
              />
            </FormRowFields>
            <div className="flex justify-end">
              <Button variant="primary" className="mt-6 w-full lg:w-1/4" type={"submit"}>
                Add Languages
              </Button>
            </div>
          </Form>
        </>
      )}
    </div>
  );
}
LanguagesForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default LanguagesForm;
