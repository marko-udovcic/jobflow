import { useFormik } from "formik";
import PropTypes from "prop-types";
import Input from "./ui/Input";
import ErrorSpan from "./ui/ErrorSpan";
import Button from "./ui/Button";
import { Link } from "react-router-dom";

function AuthForm({ onSubmit, schema, buttonText, redirectText, redirectLink, linkText }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit,
  });

  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name];

  return (
    <div className="mt-[1rem] flex h-[50vh] items-center justify-center lg:mt-[1rem]">
      <form onSubmit={formik.handleSubmit} className="flex w-[80%] flex-col items-center gap-4">
        <div className="flex w-full flex-col gap-1 lg:w-[50%]">
          <label htmlFor="email">
            <ErrorSpan showError={showError} name="email" labelName="Email*" />
          </label>
          <Input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            variant="primary"
          />
        </div>
        <div className="flex w-full flex-col gap-1 lg:w-[50%]">
          <label htmlFor="password">
            <ErrorSpan showError={showError} name="password" labelName="Password*" />
          </label>
          <Input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            variant="primary"
          />
        </div>
        <Button type="submit" variant={"primary"} className="w-full lg:w-1/2">
          {buttonText}
        </Button>
        <Link to={redirectLink}>
          <h3 className="my-5">
            {redirectText} <strong className="text-black underline">{linkText}</strong>
          </h3>
        </Link>
      </form>
    </div>
  );
}

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
  redirectText: PropTypes.string.isRequired,
  redirectLink: PropTypes.string.isRequired,
};

export default AuthForm;
