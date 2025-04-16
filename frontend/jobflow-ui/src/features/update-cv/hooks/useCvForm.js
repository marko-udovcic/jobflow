import { useState } from "react";
import { formatDate } from "../../../utils/date";
const defaultCvData = {
  personalInfo: {},
  education: [],
  experience: [],
  languages: [],
  otherSkills: [],
  computerSkills: [],
  additionalInformation: [],
};
export function useCvForm() {
  const [cvData, setCvData] = useState(defaultCvData);

  const handleUpdate = (section, data) => {
    setCvData((prev) => ({ ...prev, [section]: data }));
  };

  let isFormComplete =
    Object.keys(cvData?.personalInfo).length > 0 &&
    cvData.education.length > 0 &&
    cvData.experience.length > 0 &&
    cvData.languages.length > 0 &&
    cvData.computerSkills.length > 0 &&
    cvData.otherSkills.length > 0 &&
    cvData.additionalInformation.length > 0;

  const transformDataForDatabase = () => {
    let {
      firstname,
      lastname,
      country,
      city,
      phone,
      summary,
      dateOfBirth,
      nationality,
      drivingLicence,
    } = cvData.personalInfo;

    dateOfBirth = formatDate(dateOfBirth);

    return {
      firstname,
      lastname,
      country,
      city,
      phone,
      summary,
      education: JSON.stringify(cvData.education),
      workExperience: JSON.stringify(cvData.experience),
      languages: JSON.stringify(cvData.languages),
      computerSkills: JSON.stringify(cvData.computerSkills),
      otherSkills: JSON.stringify(cvData.otherSkills),
      additionalInformation: JSON.stringify(cvData.additionalInformation),
      dateOfBirth,
      nationality,
      drivingLicence,
    };
  };
  return { cvData, handleUpdate, isFormComplete, transformDataForDatabase };
}
