import Logo from "../components/ui/Logo";
import { NavLink } from "react-router-dom";
function AccountTypeChooser() {
  return (
    <div className="app-container text-center">
      <div className="pt-[4rem]">
        <Logo />
        <h2 className="mt-10">Join as a Client or Employer</h2>

        <div className="mt-14 flex flex-col justify-center gap-7 md:flex-row p-2">
          <NavLink to="/register/employer">
            <div
              className="group border-color-primary flex items-center justify-center rounded-2xl border-2 bg-white p-5
                text-white transition-all duration-500 ease-in-out hover:bg-[#0e0e0e] h-[10rem]"
            >
              <p className="font-semibold group-hover:text-white cursor-pointer">
                Im a client, hiring for a project
              </p>
            </div>
          </NavLink>
          <NavLink to="/register/worker">
            <div
              className="group border-color-primary flex items-center justify-center rounded-2xl border-2 bg-white p-5
                text-white transition-all duration-500 ease-in-out hover:bg-[#0e0e0e] h-[10rem]"
            >
              <p className="font-semibold group-hover:text-white cursor-pointer">
                I’m a worker, looking for work
              </p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default AccountTypeChooser;
