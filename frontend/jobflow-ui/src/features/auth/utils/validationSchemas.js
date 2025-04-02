// utils/validationSchemas.js
import * as Yup from "yup";

export const emailSchema = Yup.string()
  .email("Invalid email format")
  .matches(/^(?!.*,).*$/, "Email must not contain a comma.")
  .required("Email is required");

export const passwordSchema = Yup.string()
  .min(8, "Password must be at least 8 characters long")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[\W_]/, "Password must contain at least one special character")
  .required("Password is required");

export const passwordLoginSchema = Yup.string().required("Password is required");

export const registerSchema = Yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = Yup.object({
  email: emailSchema,
  password: passwordLoginSchema,
});
