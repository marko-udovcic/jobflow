// src/schemas/educationSchema.js
import * as Yup from "yup";

export const experienceSchema = Yup.object({
  jobTitle: Yup.string().required("Job Title is required"),
  companyName: Yup.string().required("Company Name is required"),
  location: Yup.string()
    .matches(/^[a-zA-Z\s]+,\s[a-zA-Z\s]+$/, "Location must be in the format: 'City, Country'")
    .required("Location is required"),

  dateRange: Yup.string()
    .matches(
      /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{4} [-to] (January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/,
      "Format must be: 'January 2024 - January 2025'",
    )
    .required("Date range is required"),
});
export const initialValues = {
  jobTitle: "",
  companyName: "",
  location: "",
  dateRange: "",
  summary: "",
};
