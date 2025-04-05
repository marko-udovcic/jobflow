import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object({
  jobPosition: Yup.string().required("Job Position is required"),
});

const initialValues = {
  jobPosition: "",
  content: "",
};
export function useApplyForm(onSubmit) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name];

  return { formik, showError };
}
