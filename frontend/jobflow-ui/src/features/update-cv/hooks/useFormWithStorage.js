import { useEffect, useState } from "react";
import { useFormik } from "formik";
export function useFormWithStorage(key, validationSchema, onUpdate, initialValues = {}) {
  const savedList = JSON.parse(localStorage.getItem(key)) || [];
  const [list, setList] = useState(savedList);

  useEffect(() => {
    onUpdate(savedList);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newList = [...list, { ...values }];

      localStorage.setItem(key, JSON.stringify(newList));
      onUpdate(newList);
      setList(newList);
      resetForm();
    },
  });

  const removeItem = (index) => {
    const newList = list.filter((_, i) => i !== index);
    localStorage.setItem(key, JSON.stringify(newList));

    onUpdate(newList);
    setList(newList);
  };
  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name];

  return { formik, list, removeItem, showError };
}
