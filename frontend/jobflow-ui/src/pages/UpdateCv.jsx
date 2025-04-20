import { useParams } from "react-router-dom";
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
import { useDigitalCv } from "../features/worker-profile/hooks/useDigitalCv";
import { useUpdateCv } from "../features/update-cv/hooks/useUpdateCv";
import Logout from "../features/auth/components/Logout";
function UpdateCv() {
  const { workerId } = useParams();
  const isUpdateCv = workerId !== undefined;
  const { digitalCv, isLoading } = useDigitalCv(workerId);

  const { handleUpdate, isFormComplete, transformDataForDatabase } = useCvForm();
  const { createCV } = useCreateCv();
  const { updateCV } = useUpdateCv();
  const handleSubmit = () => {
    const data = transformDataForDatabase();

    if (isUpdateCv) {
      updateCV(data);
    } else {
      createCV(data);
    }

    localStorage.clear();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="overflow-hidden p-2 lg:p-0">
      <div className="my-5 flex flex-col items-center justify-center p-2">
        <div className="flex items-center justify-between xl:w-[70%]">
          <Logo />
          {!digitalCv && <Logout />}
        </div>

        {!isUpdateCv && (
          <p className="mt-5 text-[#BC0A0A] lg:w-[70%]">
            Dear Candidate ,
            <br />
            Please complete your CV on this page.
            <br />
            A completed CV is essential as it is automatically attached to every job application,
            saving time for both you and us. Without a fully completed CV, you will not be able to
            apply for job opportunities.
            <br />
            Thank you for your cooperation!
          </p>
        )}
      </div>

      <div className="mx-auto mt-5 w-full xl:w-[70%]">
        <PersonalInfoForm
          onUpdate={(data) => handleUpdate("personalInfo", data)}
          cvData={digitalCv}
        />
        <EducationForm
          onUpdate={(data) => handleUpdate("education", data)}
          storedEducation={digitalCv?.education}
        />
        <ExperienceForm
          onUpdate={(data) => handleUpdate("experience", data)}
          storedExperience={digitalCv?.workExperience}
        />
        <LanguagesForm
          onUpdate={(data) => handleUpdate("languages", data)}
          storedLanguages={digitalCv?.languages}
        />
        <ComputerSkillsForm
          onUpdate={(data) => handleUpdate("computerSkills", data)}
          storedComputerSkills={digitalCv?.computerSkills}
        />
        <OtherSkillsForm
          onUpdate={(data) => handleUpdate("otherSkills", data)}
          storedOtherSkills={digitalCv?.otherSkills}
        />
        <AdditionalInfoForm
          onUpdate={(data) => handleUpdate("additionalInformation", data)}
          storedAdditionalInfo={digitalCv?.additionalInformation}
        />

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
