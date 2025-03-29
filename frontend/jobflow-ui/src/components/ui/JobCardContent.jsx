import PropTypes from "prop-types";
import Button from "./Button";
import moment from "moment";
import { GoBriefcase } from "react-icons/go";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import JobDetailRow from "./JobDetailRow";
function JobCardContent({ job, variant, isAuthUser }) {
  const firstLetter = job.companyName[0].toUpperCase();
  const paragraphStyle = variant === "secondary" ? "" : "text-[#ACACAC]";
  const formattedDate = moment(job.postingDate).calendar();

  return (
    <div className="p-7">
      <div className="mb-3 flex flex-row items-center justify-between">
        <h2 className="bg-gold-color flex h-15 w-15 items-center justify-center rounded-full font-semibold text-black">
          {firstLetter}
        </h2>
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
        <div className="mt-3 flex flex-row items-center justify-between gap-7">
          <Button className={"bg-gold-color text-black-color flex-1 rounded-lg p-2 font-medium"}>
            View Detail
          </Button>
          <Button
            className="cursor-pointer text-red-600"
            onClick={(event) => {
              event.preventDefault();
              alert("kliknuto");
            }}
          >
            Remove
          </Button>
        </div>
      ) : (
        <Button
          className={"bg-gold-color text-black-color mt-3 w-full flex-1 rounded-lg p-2 font-medium"}
        >
          Apply Now
        </Button>
      )}

      <p className={`${paragraphStyle} mt-4 text-right`}>{formattedDate}</p>
    </div>
  );
}

JobCardContent.propTypes = {
  job: PropTypes.shape({
    companyName: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
  }).isRequired,
  variant: PropTypes.string.isRequired,
};

export default JobCardContent;
