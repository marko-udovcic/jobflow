import { registerSchema } from "../utils/validationSchemas";
import { useSignup } from "../hooks/useSignup";
import AuthForm from "../../../components/AuthForm";
import PropTypes from "prop-types";
function RegisterForm({ roleName }) {
  const { signUp } = useSignup();

  const handleSubmit = (values) => {
    const data = {
      email: values.email,
      password: values.password,
      role: [roleName.toUpperCase()],
    };
    signUp(data);
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      schema={registerSchema}
      buttonText="Sign Up"
      redirectText="Already have an account?"
      redirectLink="/login"
      linkText="Log In"
    />
  );
}
RegisterForm.propTypes = {
  roleName: PropTypes.string.isRequired,
};

export default RegisterForm;
