import AuthForm from "../../../components/AuthForm";
import { loginSchema } from "../utils/validationSchemas";
import { useLogin } from "../hooks/useLogin";
function LoginForm() {
  const { login, error } = useLogin();
  const handleSubmit = (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    login(data);
  };

  return (
    <>
      {error && (
        <div className="mt-[1rem] flex justify-center">
          <span className="text-center text-[18px] text-red-600">{error.message}</span>
        </div>
      )}
      <AuthForm
        onSubmit={handleSubmit}
        schema={loginSchema}
        buttonText="Login"
        redirectText="Doesn’t have an account?"
        redirectLink="/account-type"
        linkText="Sign Up"
      />
    </>
  );
}

export default LoginForm;
