import { NavLink } from "react-router-dom";

function UserLogo({ user = {}, isJobPostPage = false }) {
  const currentUserName = user?.companyName;
  const companyEmail = user?.email;
  return (
    <>
      <div className="mt-5 flex flex-row items-center gap-5">
        <div className="bg-black-color flex h-[70px] w-[70px] items-center justify-center rounded-xl lg:h-[80px] lg:w-[90px]">
          <h2 className="text-3xl text-white uppercase lg:text-5xl">{currentUserName?.[0]}</h2>
        </div>
        <NavLink
          to={isJobPostPage ? `/employer/profile/${user?.id}` : ""}
          className={({ isActive }) => `${isActive ? "bg-transparent" : ""}`}
        >
          <div>
            <h2 className="underline">{currentUserName}</h2>
            <p className="pl-0.5">Email: {companyEmail}</p>
          </div>
        </NavLink>
      </div>
    </>
  );
}

export default UserLogo;
