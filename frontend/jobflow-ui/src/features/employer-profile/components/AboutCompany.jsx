import PropTypes from "prop-types";

function AboutCompany({ aboutCompany }) {
  return (
    <div className="mt-5 w-full lg:w-[80%]">
      <h2 className="mb-3">About Company</h2>
      <p className="text-">{aboutCompany}</p>
    </div>
  );
}

AboutCompany.propTypes = {
  aboutCompany: PropTypes.string.isRequired,
};

export default AboutCompany;
