function UserLogo({ currentUserName = "Null", companyEmail = "default" }) {
  return (
    <div className="mt-5 flex flex-row items-center gap-5">
      <div className="bg-black-color flex h-[70px] w-[70px] items-center justify-center rounded-xl lg:h-[80px] lg:w-[90px]">
        <h2 className="text-3xl text-white uppercase lg:text-5xl">{currentUserName?.[0]}</h2>
      </div>
      <div>
        <h2>{currentUserName}</h2>
        <p className="pl-0.5">Email: {companyEmail}</p>
      </div>
    </div>
  );
}

export default UserLogo;
