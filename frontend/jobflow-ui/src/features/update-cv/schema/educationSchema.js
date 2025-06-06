// src/schemas/educationSchema.js
import * as Yup from "yup";

export const educationSchema = Yup.object({
  degree: Yup.string().required("Degree is required"),
  university: Yup.string().required("University/School is required"),
  dateRange: Yup.string()
    .matches(
      /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{4} [-to] ((January|February|March|April|May|June|July|August|September|October|November|December) \d{4}|Present)$/,
      "Format must be: 'January 2024 - January 2025' or 'January 2024 - Present'",
    )
    .required("Date range is required"),
});
export const initialValues = {
  degree: "",
  dateRange: "",
  university: "",
};
