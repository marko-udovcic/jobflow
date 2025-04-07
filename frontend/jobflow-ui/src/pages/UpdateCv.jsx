import PersonalInfoForm from "../features/update-cv/components/PersonalInfoForm";
import EducationForm from "../features/update-cv/components/EducationForm";
import ExperienceForm from "../features/update-cv/components/ExperienceForm";
import LanguagesForm from "../features/update-cv/components/LanguagesForm";
import ComputerSkillsForm from "../features/update-cv/components/ComputerSkillsForm";
import OtherSkillsForm from "../features/update-cv/components/OtherSkillsForm";
import Button from "../components/ui/Button";
import AdditionalInfoForm from "../features/update-cv/components/AdditionalInfoForm";
import Logo from "../components/ui/Logo";
import { useCvForm } from "../features/update-cv/hooks/useCvForm";
import { useCreateCv } from "../features/update-cv/hooks/useCreateCv";
function UpdateCv() {
  const { cvData, handleUpdate, isFormComplete, transformDataForDatabase } = useCvForm();
  const { createCV, isLoading } = useCreateCv();
  const handleSubmit = () => {
    const data = transformDataForDatabase();
    console.log("ispis current cvData", cvData);
    console.log("ispis data", data);

    createCV(data);
  };

  return (
    <div className="overflow-hidden p-2 lg:p-0">
      <div className="my-5 flex flex-col items-center justify-center p-2">
        <Logo />
        <p className="mt-5 text-[#BC0A0A] lg:w-[70%]">
          Dear Candidate,
          <br />
          Please complete your CV on this page.
          <br />
          A completed CV is essential as it is automatically attached to every job application,
          saving time for both you and us. Without a fully completed CV, you will not be able to
          apply for job opportunities.
          <br />
          Thank you for your cooperation!
        </p>
      </div>

      <div className="mx-auto mt-5 w-full xl:w-[70%]">
        <PersonalInfoForm onUpdate={(data) => handleUpdate("personalInfo", data)} />
        <EducationForm onUpdate={(data) => handleUpdate("education", data)} />
        <ExperienceForm onUpdate={(data) => handleUpdate("experience", data)} />
        <LanguagesForm onUpdate={(data) => handleUpdate("languages", data)} />
        <ComputerSkillsForm onUpdate={(data) => handleUpdate("computerSkills", data)} />
        <OtherSkillsForm onUpdate={(data) => handleUpdate("otherSkills", data)} />
        <AdditionalInfoForm onUpdate={(data) => handleUpdate("additionalInformation", data)} />

        <div className="mt-10 flex justify-center md:mt-5">
          <Button
            disabled={!isFormComplete}
            onClick={handleSubmit}
            variant={!isFormComplete ? "disabled" : "primary"}
            className={"w-full md:w-[40%]"}
          >
            {!isFormComplete ? "Complete your CV" : "Save CV"}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default UpdateCv;
