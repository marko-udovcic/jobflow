import { Navigate, useParams } from "react-router-dom";
import RegisterForm from "../features/auth/components/RegisterForm";
import Logo from "../components/ui/Logo";
function Register() {
  const { roleName } = useParams();

  const allowedRoles = ["employer", "worker"];
  const employer = allowedRoles[0];
  const heading = `Sign up to ${roleName === employer ? "hire talent" : "find work"}`;

  if (!allowedRoles.includes(roleName)) return <Navigate to="/login" replace />;

  return (
    <div className="app-container">
      <div className="pt-[4rem] text-center">
        <Logo />
        <h2 className="mt-10">{heading}</h2>
      </div>

      <RegisterForm roleName={roleName} />
    </div>
  );
}

export default Register;
