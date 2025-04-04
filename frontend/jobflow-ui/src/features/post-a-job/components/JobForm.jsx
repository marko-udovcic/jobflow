import InputLabelField from "../../../components/ui/InputLabelField";
import SelectField from "../../../components/ui/SelectField";
import FormRowFields from "../../../components/ui/FormRowFields";
import Button from "../../../components/ui/Button";
import { useJobForm } from "../hooks/useJobForm";
import { useCategories } from "../../../hooks/useCategories";
import { useCreateJobPost } from "../hooks/useCreateJobPost";

const JOB_TYPE_OPTIONS = [
  { value: "Full-Time" },
  { value: "Part-time" },
  { value: "Internship" },
  { value: "Freelance" },
  { value: "Student Job" },
];

function JobForm() {
  const { createJobPost } = useCreateJobPost();
  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name];
  const handleSubmit = (values) => {
    const { city, country, ...rest } = values;
    const jobData = {
      ...rest,
      location: `${city},${country}`,
    };

    createJobPost(jobData);
  };

  const { data: categories, isLoading } = useCategories();
  const formik = useJobForm(handleSubmit);

  if (isLoading) return <div>Loading...</div>;

  const CATEGORY_OPTIONS = categories.map((category) => ({
    value: { id: category.id, name: category.name },
  }));

  return (
    <div className="mx-auto mt-5 min-h-[120vh] w-full xl:w-[70%]">
      <form onSubmit={formik.handleSubmit}>
        <InputLabelField name="title" labelName="Job title" formik={formik} showError={showError} />
        <InputLabelField
          name="salary"
          labelName="Job salary"
          formik={formik}
          showError={showError}
        />

        <FormRowFields>
          <InputLabelField name="city" labelName="City" formik={formik} showError={showError} />
          <InputLabelField
            name="country"
            labelName="Country"
            formik={formik}
            showError={showError}
          />
        </FormRowFields>

        <FormRowFields>
          <SelectField
            name="jobType"
            labelName="Job Type"
            formik={formik}
            showError={showError}
            options={JOB_TYPE_OPTIONS}
          />
          <SelectField
            name="categoryId"
            labelName="Category"
            formik={formik}
            showError={showError}
            options={CATEGORY_OPTIONS}
          />
        </FormRowFields>

        <InputLabelField
          name="description"
          labelName="Description"
          type="textarea"
          inputVariant="fullHeightTextarea"
          formik={formik}
          showError={showError}
        />
        <InputLabelField
          name="responsibilities"
          labelName="Responsibilities"
          type="textarea"
          inputVariant="fullHeightTextarea"
          formik={formik}
          showError={showError}
        />
        <InputLabelField
          name="jobsRequirements"
          labelName="Job Requirements"
          type="textarea"
          inputVariant="fullHeightTextarea"
          formik={formik}
          showError={showError}
        />

        <div className="flex justify-end">
          <Button variant="primary" className="mt-6 w-full lg:w-1/4" type={"submit"}>
            Add Job
          </Button>
        </div>
      </form>
    </div>
  );
}

export default JobForm;
