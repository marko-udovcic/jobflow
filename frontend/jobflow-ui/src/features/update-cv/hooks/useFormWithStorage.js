import { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";

export function useFormWithStorage(key, validationSchema, onUpdate, initialValues = {}) {
  const savedList = JSON.parse(localStorage.getItem(key)) || [];
  const [list, setList] = useState(savedList);
  const initialUpdateDoneRef = useRef(false);
  const prevListRef = useRef(list);

  useEffect(() => {
    if (!initialUpdateDoneRef.current) {
      onUpdate(list);
      initialUpdateDoneRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (JSON.stringify(prevListRef.current) === JSON.stringify(list)) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(list));
    onUpdate(list);

    prevListRef.current = list;
  }, [list, key, onUpdate]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newList = [...list, { ...values }];
      setList(newList);
      resetForm();
    },
  });

  const removeItem = (index) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name];

  return { formik, list, setList, removeItem, showError };
}
