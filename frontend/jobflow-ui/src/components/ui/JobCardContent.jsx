import PropTypes from "prop-types";
import Button from "./Button";
import moment from "moment";
import { GoBriefcase } from "react-icons/go";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import JobDetailRow from "./JobDetailRow";
import CompanyActionButtons from "../../features/employer-profile/components/CompanyActionButtons";
function JobCardContent({ job, variant, isAuthUser }) {
  const firstLetter = job.companyName[0].toUpperCase();
  const paragraphStyle = variant === "secondary" ? "" : "text-[#ACACAC]";
  const formattedDate = moment(job.postingDate).calendar();

  return (
    <>
      <div className="overflow-hidden p-7">
        <div className="mb-3 flex flex-row items-center justify-between">
          {isAuthUser ? (
            <h2 className="bg-gold-color flex h-15 w-15 items-center justify-center rounded-full font-semibold text-black">
              {firstLetter}
            </h2>
          ) : (
            <h2 className="font-medium text-white underline">{job.companyName}</h2>
          )}

          <p className="bg-gold-color rounded-lg p-1 font-semibold text-black">{job.jobType}</p>
        </div>

        <h2 className="mb-1 text-2xl">{job.title}</h2>

        <JobDetailRow>
          <SlLocationPin className={paragraphStyle} />
          <p className={paragraphStyle}>{job.location}</p>
        </JobDetailRow>

        <JobDetailRow>
          <GoBriefcase className={paragraphStyle} />
          <p className={paragraphStyle}>{job.categoryName}</p>
        </JobDetailRow>

        <JobDetailRow>
          <RiMoneyDollarCircleLine className={paragraphStyle} />
          <p className={paragraphStyle}>{job.salary}</p>
        </JobDetailRow>

        {isAuthUser ? (
          <CompanyActionButtons jobPostingId={job.id} />
        ) : (
          <Button
            className={
              "bg-gold-color text-black-color mt-3 w-full flex-1 rounded-lg p-2 font-medium"
            }
          >
            Apply Now
          </Button>
        )}

        <p className={`${paragraphStyle} mt-4 text-right`}>{formattedDate}</p>
      </div>
    </>
  );
}

JobCardContent.propTypes = {
  job: PropTypes.shape({
    companyName: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    postingDate: PropTypes.string.isRequired,
  }).isRequired,
  variant: PropTypes.string.isRequired,
  isAuthUser: PropTypes.bool.isRequired,
};

export default JobCardContent;
