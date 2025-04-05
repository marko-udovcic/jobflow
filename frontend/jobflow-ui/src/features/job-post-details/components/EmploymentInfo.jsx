import EmploymentInfoCard from "./EmploymentInfoCard";
import PropTypes from "prop-types";
function EmploymentInfo({ jobPost }) {
  return (
    <div className="border-1-color-primary mt-5 mb-3 rounded-[20px] p-5 lg:p-10">
      <h2 className="font-primary mb-2.5 ml-2 text-2xl font-medium">Employment Information</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <EmploymentInfoCard title="Category" content={jobPost?.categoryName} />
        <EmploymentInfoCard title="Location" content={jobPost?.location} />
        <EmploymentInfoCard title="Job Type" content={jobPost?.jobType} />
        <EmploymentInfoCard title="Salary" content={jobPost?.salary} />
      </div>
    </div>
  );
}
EmploymentInfo.propTypes = {
  jobPost: PropTypes.shape({
    categoryName: PropTypes.string,
    location: PropTypes.string,
    jobType: PropTypes.string,
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default EmploymentInfo;
