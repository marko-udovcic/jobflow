import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./ui/Logo";
import Logout from "../features/auth/components/Logout";
import { useAuthStore } from "../store/useAuthStore";

function Navbar() {
  const { currentUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const profileLink = currentUser?.role === "WORKER" ? "/worker/profile" : "/employer/profile";
  const notAdmin = currentUser?.role !== "ADMIN";

  return (
    <nav className="flex items-center justify-between p-5 shadow-sm">
      <Logo />

      <button className="text-black md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "X" : "Menu"}
      </button>

      <div
        className={`absolute top-16 left-0 w-full p-5 shadow-md md:static md:w-auto md:p-0 md:shadow-none
          ${isOpen ? "block" : "hidden"} z-100 md:flex md:gap-5 bg-[var(--color-body-bg)]`}
      >
        <ul className="flex flex-col gap-5 md:flex-row">
          {notAdmin && (
            <li>
              <NavLink to={profileLink}>Profile</NavLink>
            </li>
          )}
          {currentUser?.role === "EMPLOYER" && (
            <li>
              <NavLink to="/employer/post-job">Post a Job</NavLink>
            </li>
          )}
          {currentUser?.role === "WORKER" && (
            <>
              <li>
                <NavLink to="/applications">Applications</NavLink>
              </li>
              <li>
                <NavLink to="/explore-jobs">Explore Jobs</NavLink>
              </li>
            </>
          )}
          <li className="md:hidden">
            <Logout className="!border-0 bg-transparent !px-0 !text-black hover:bg-transparent" />
          </li>
        </ul>
      </div>

      <div className="hidden md:block">
        <Logout />
      </div>
    </nav>
  );
}

export default Navbar;
