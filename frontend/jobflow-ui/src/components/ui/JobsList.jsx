import { NavLink } from "react-router-dom";
import Card from "./Card";
import JobCardContent from "./JobCardContent";
import PropTypes from "prop-types";
function JobsList({ jobList, cardVariant, isAuthUser, className }) {
  return (
    <div className={`mt-5 ${className}`}>
      {jobList === undefined || jobList.length === 0 ? (
        <p className="text-center text-2xl">No jobs found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {jobList.map((job) => (
            <NavLink to={`/job-post-details/${job.id}`} key={job.id}>
              <Card key={job.id} variant={cardVariant} className={"h-full"}>
                <JobCardContent job={job} variant={cardVariant} isAuthUser={isAuthUser} />
              </Card>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

JobsList.propTypes = {
  jobList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ).isRequired,
  cardVariant: PropTypes.string.isRequired,
  isAuthUser: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default JobsList;
