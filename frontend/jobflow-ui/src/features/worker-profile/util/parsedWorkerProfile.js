export const parseWorkerProfile = (workerProfile) => {
  if (!workerProfile) return null;

  return {
    ...workerProfile,
    workExperience: JSON.parse(workerProfile.workExperience || "[]"),
    education: JSON.parse(workerProfile.education || "[]"),
    languages: JSON.parse(workerProfile.languages || "[]"),
    computerSkills: JSON.parse(workerProfile.computerSkills || "[]"),
    otherSkills: JSON.parse(workerProfile.otherSkills || "[]"),
    additionalInformation: JSON.parse(workerProfile.additionalInformation || "[]"),
  };
};
