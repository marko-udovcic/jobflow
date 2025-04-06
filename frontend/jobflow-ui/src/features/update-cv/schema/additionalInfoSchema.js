import * as Yup from "yup";

export const additionalInfoSchema = Yup.object({
  additionalInfo: Yup.string().required("Additional Information is required"),
});
export const initialValues = {
  additionalInfo: "",
};
