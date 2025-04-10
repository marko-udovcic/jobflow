import { useFormik } from "formik";
import { useEffect, useState } from "react";

export const useEducationForm = (onUpdate, validationSchema, initialValues) => {
  const savedEducation = JSON.parse(localStorage.getItem("educationList")) || [];
  const [educationList, setEducationList] = useState(savedEducation);

  useEffect(() => {
    onUpdate(savedEducation);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("values", values);

      const newList = [...educationList, { ...values }];

      localStorage.setItem("educationList", JSON.stringify(newList));
      onUpdate(newList);
      setEducationList(newList);
      resetForm();
    },
  });

  const removeEducation = (index) => {
    const newList = educationList.filter((_, i) => i !== index);
    localStorage.setItem("educationList", JSON.stringify(newList));

    onUpdate(newList);
    setEducationList(newList);
  };

  return { formik, educationList, removeEducation };
};
