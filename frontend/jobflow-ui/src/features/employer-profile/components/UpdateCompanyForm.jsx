import InputLabelField from "../../../components/ui/InputLabelField";
import { useUpdateCompanyDetails } from "../hooks/useUpdateCompanyDetails";
import Button from "../../../components/ui/Button";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  companyName: Yup.string().required("Company Name is required"),
  aboutCompany: Yup.string().required("About Company is required"),
});

function UpdateCompanyForm({ setIsModalOpen }) {
  const { updateCompanyDetails } = useUpdateCompanyDetails();
  const formik = useFormik({
    initialValues: {
      companyName: "",
      aboutCompany: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      updateCompanyDetails(values);
      setIsModalOpen((prev) => !prev);
    },
  });
  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name];
  return (
    <div className="p-5 w-full mx-auto">
      <h2 className="text-3xl text-center mb-6">Update Company Details</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <InputLabelField
          name="companyName"
          labelName="Company Name"
          formik={formik}
          showError={showError}
        />
        <InputLabelField
          name="aboutCompany"
          labelName="About Company"
          type="textarea"
          inputVariant="textarea"
          formik={formik}
          showError={showError}
        />

        <Button type="submit" variant="primary" className="w-full mt-6">
          Update Details
        </Button>
      </form>
    </div>
  );
}

UpdateCompanyForm.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
};

export default UpdateCompanyForm;
