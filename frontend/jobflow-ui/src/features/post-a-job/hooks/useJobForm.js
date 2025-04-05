import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object({
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  salary: Yup.string()
    .max(20, "Salary must be less than or equal to 20 characters")
    .required("Salary is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  jobType: Yup.string().required("Job Type is required"),
  jobsRequirements: Yup.string().required("Job Requirements is required"),
  responsibilities: Yup.string().required("Responsibilities is required"),
  categoryId: Yup.string().required("Category is required"),
});
export const useJobForm = (onSubmit) => {
  return useFormik({
    initialValues: {
      country: "",
      city: "",
      title: "",
      description: "",
      salary: "",
      jobType: "",
      jobsRequirements: "",
      responsibilities: "",
      categoryId: "",
    },
    validationSchema,
    onSubmit,
  });
};
