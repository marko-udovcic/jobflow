import * as Yup from "yup";

export const computerSkillsSchema = Yup.object({
  skillName: Yup.string().required("Computer Skills is required"),
});
export const initialValues = {
  skillName: "",
};

export const otherSkillsSchema = Yup.object({
  skillName: Yup.string().required("Other Skills is required"),
});
