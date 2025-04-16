import FormRowFields from "../../../components/ui/FormRowFields";
import InputLabelField from "../../../components/ui/InputLabelField";
import { usePersonalInfoForm } from "../hooks/usePersonalInfoForm";
import Button from "../../../components/ui/Button";
import SectionTitle from "./SectionTitle";
import ToggleButton from "./ToggleButton";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const fieldGroups = [
  [
    { name: "firstname", label: "First Name" },
    { name: "lastname", label: "Last Name" },
  ],
  [
    { name: "country", label: "Country" },
    { name: "city", label: "City" },
  ],
  [
    { name: "drivingLicence", label: "Driving Licence" },
    { name: "dateOfBirth", label: "Date of Birth (yyyy-MM-dd)", type: "date" },
  ],
  [
    { name: "nationality", label: "Nationality" },
    { name: "phone", label: "Phone Number" },
  ],
];

function PersonalInfoForm({ onUpdate, cvData }) {
  const localStorageKey = "personalInfo";
  const [isOpen, setIsOpen] = useState(true);
  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name];
  const localStorageData = JSON.parse(localStorage.getItem(localStorageKey)) || {};

  const initialData =
    Object.keys(localStorageData).length > 0
      ? localStorageData
      : {
          firstname: cvData?.firstname || "",
          lastname: cvData?.lastname || "",
          country: cvData?.country || "",
          city: cvData?.city || "",
          drivingLicence: cvData?.drivingLicence || "",
          dateOfBirth: cvData?.dateOfBirth || "",
          nationality: cvData?.nationality || "",
          phone: cvData?.phone || "",
          summary: cvData?.summary || "",
        };

  const handleSubmit = (values) => {
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    onUpdate(values);
    setIsOpen(false);
  };
  const formik = usePersonalInfoForm(handleSubmit, initialData);

  useEffect(() => {
    onUpdate(initialData);
  }, []);

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`my-3 flex items-center justify-between ${!isOpen ? "rounded-3xl bg-black text-white" : ""}`}
      >
        <SectionTitle title="Personal Info" className={`${!isOpen ? "p-1" : ""}`} />
        <ToggleButton isOpen={isOpen} />
      </div>

      {isOpen && (
        <>
          <form onSubmit={formik.handleSubmit}>
            {fieldGroups.map((fieldGroup, groupIndex) => (
              <FormRowFields key={groupIndex}>
                {fieldGroup.map((field, fieldIndex) => (
                  <InputLabelField
                    type={field.type || "text"}
                    key={fieldIndex}
                    name={field.name}
                    placeholder={field.label}
                    labelName={field.label}
                    formik={formik}
                    showError={showError}
                  />
                ))}
              </FormRowFields>
            ))}

            <InputLabelField
              name="summary"
              labelName="Summary"
              type="textarea"
              inputVariant="fullHeightTextarea"
              formik={formik}
              placeholder="Include a short summary about your professional experience"
              showError={showError}
            />
            <div className="flex justify-end">
              <Button variant="primary" className="mt-6 w-full lg:w-1/4" type={"submit"}>
                Add Personal Info
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
PersonalInfoForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  cvData: PropTypes.object,
};

export default PersonalInfoForm;
