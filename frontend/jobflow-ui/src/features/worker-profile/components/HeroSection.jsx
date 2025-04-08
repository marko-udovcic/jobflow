import PropTypes from "prop-types";

function HeroSection({ firstName = "User", lastname = "User" }) {
  return (
    <div className="mb-7">
      <div className="bg-black-color flex h-50 items-center justify-center rounded-2xl lg:justify-start lg:pl-10">
        <h1 className="text-white">
          {firstName} {lastname}
        </h1>
      </div>
    </div>
  );
}

HeroSection.propTypes = {
  firstName: PropTypes.string,
  lastname: PropTypes.string,
};

export default HeroSection;
