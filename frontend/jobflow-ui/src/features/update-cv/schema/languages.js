import * as Yup from "yup";

export const languagesSchema = Yup.object({
  languages: Yup.string().required("Languages is required"),
  languagesLevel: Yup.string().required("Languages Level is required"),
});
export const initialValues = {
  languages: "",
  languagesLevel: "",
};
