import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./ui/Logo";
import Logout from "../features/auth/components/Logout";
import { useAuthStore } from "../store/useAuthStore";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const { currentUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const profileLink = currentUser?.role === "WORKER" ? "/worker/profile" : "/employer/profile";
  const notAdmin = currentUser?.role !== "ADMIN";

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="flex items-center justify-between px-5 py-5 lg:px-0">
      <Logo />

      <button
        className="cursor-pointer text-2xl text-black md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoMdClose /> : <CiMenuBurger />}
      </button>

      <div
        className={`absolute top-16 left-0 w-full p-5 shadow-md md:static md:w-auto md:p-0 md:shadow-none ${isOpen ? "block" : "hidden"} z-100 bg-[var(--color-body-bg)] md:flex md:gap-5`}
      >
        <ul className="flex flex-col items-center gap-5 md:flex-row md:items-center md:justify-center">
          {notAdmin && (
            <li className="w-full text-center md:w-auto">
              <NavLink to={profileLink} onClick={handleNavLinkClick}>
                Profile
              </NavLink>
            </li>
          )}
          {currentUser?.role === "EMPLOYER" && (
            <li className="w-full text-center md:w-auto">
              <NavLink to="/employer/post-job" onClick={handleNavLinkClick}>
                Post a Job
              </NavLink>
            </li>
          )}
          {currentUser?.role === "WORKER" && (
            <>
              <li className="w-full text-center md:w-auto">
                <NavLink to="/applications" onClick={handleNavLinkClick}>
                  Applications
                </NavLink>
              </li>
              <li className="w-full text-center md:w-auto">
                <NavLink to="/explore-jobs" onClick={handleNavLinkClick}>
                  Explore Jobs
                </NavLink>
              </li>
            </>
          )}
          {currentUser?.role === "ADMIN" && (
            <>
              <li className="w-full text-center md:w-auto">
                <NavLink to="/admin/dashboard" onClick={handleNavLinkClick}>
                  Dashboard
                </NavLink>
              </li>
              <li className="w-full text-center md:w-auto">
                <NavLink to="/explore-jobs" onClick={handleNavLinkClick}>
                  Explore Jobs
                </NavLink>
              </li>
            </>
          )}
          <li className="w-full text-center md:hidden md:w-auto">
            <Logout
              className="!border-0 bg-transparent !px-0 !text-black hover:bg-transparent"
              onClick={handleNavLinkClick}
            />
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
