import Logo from "../components/ui/Logo";
import LoginForm from "../features/auth/components/LoginForm";
function Login() {
  return (
    <div className="app-container">
      <div className="pt-[4rem] text-center">
        <Logo />
        <h2 className="mt-10">Login to Your Account</h2>
      </div>
      <LoginForm />
    </div>
  );
}

export default Login;
