import { useNavigate, useParams } from "react-router-dom";
import HeroSection from "../features/worker-profile/components/HeroSection";
import { useDigitalCv } from "../features/worker-profile/hooks/useDigitalCv";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { parseWorkerProfile } from "../features/worker-profile/util/parsedWorkerProfile";
import PersonalInfo from "../features/worker-profile/components/PersonalInfo";
import Summary from "../features/worker-profile/components/Summary";
import WorkExperience from "../features/worker-profile/components/WorkExperience";
import Education from "../features/worker-profile/components/Education";
import Languages from "../features/worker-profile/components/Languages";
import Skills from "../features/worker-profile/components/Skills";
import AdditionalInfo from "../features/worker-profile/components/AdditionalInfo";
function WorkerProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = id === undefined ? currentUser?.id : id;
  const { digitalCv, isLoading, isError } = useDigitalCv(userId);

  useEffect(() => {
    if (!isLoading && isError && id === undefined) {
      navigate("/worker/update-cv");
    }
  }, [isLoading, digitalCv, navigate, id, isError]);
  const parsedDigitalCv = parseWorkerProfile(digitalCv);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-2 lg:p-0">
      <HeroSection firstName={parsedDigitalCv?.firstname} lastname={parsedDigitalCv?.lastname} />
      <PersonalInfo userCv={parsedDigitalCv} />
      <Summary summary={parsedDigitalCv?.summary} />
      <WorkExperience workExperience={parsedDigitalCv?.workExperience} />
      <Education education={parsedDigitalCv?.education} />
      <Languages languages={parsedDigitalCv?.languages} />
      <Skills
        computerSkills={parsedDigitalCv?.computerSkills}
        otherSkills={parsedDigitalCv?.otherSkills}
      />
      <AdditionalInfo additionalInfo={parsedDigitalCv?.additionalInformation} />
    </div>
  );
}

export default WorkerProfile;
