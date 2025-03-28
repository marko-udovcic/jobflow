import Card from "./Card";
import JobCardContent from "./JobCardContent";
function JobsList({ jobList, cardVariant, isAuthUser }) {
  return (
    <div className="mt-5">
      {jobList === undefined || jobList.length === 0 ? (
        <p className="text-center text-2xl">No jobs found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {jobList.map((job) => (
            <Card key={job.id} variant={cardVariant}>
              <JobCardContent job={job} variant={cardVariant} isAuthUser={isAuthUser} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobsList;
