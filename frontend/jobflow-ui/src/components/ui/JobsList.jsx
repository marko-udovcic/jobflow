import { NavLink } from "react-router-dom";
import Card from "./Card";
import JobCardContent from "./JobCardContent";
function JobsList({ jobList, cardVariant, isAuthUser }) {
  return (
    <div className="mt-5">
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
export default JobsList;
