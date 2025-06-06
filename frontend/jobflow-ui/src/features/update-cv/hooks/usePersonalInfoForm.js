import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  drivingLicence: Yup.string().required("Driving Licence is required"),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .typeError("Invalid date format, expected yyyy-MM-dd"),
  nationality: Yup.string().required("Nationality is required"),
  phone: Yup.string().required("Phone Number is required"),
});
export const usePersonalInfoForm = (onSubmit, initialValues) => {
  return useFormik({
    initialValues: {
      country: initialValues?.country || "",
      city: initialValues?.city || "",
      firstname: initialValues?.firstname || "",
      lastname: initialValues?.lastname || "",
      drivingLicence: initialValues?.drivingLicence || "",
      dateOfBirth: initialValues?.dateOfBirth || "",
      nationality: initialValues?.nationality || "",
      phone: initialValues?.phone || "",
      summary: initialValues?.summary || "",
    },
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });
};
