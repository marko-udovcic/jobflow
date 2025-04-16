import { useState } from "react";
import PropTypes from "prop-types";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import WorkerActions from "./WorkerActions";
import StatusSelector from "./StatusSelector";
import { useJobApplicationStatuses } from "../hooks/useJobApplicationStatuses";
import WorkerDetails from "./WorkerDetails";
import HeadingGrid from "./HeadingGrid";
import Pagination from "../../../components/Pagination";

function JobPostApplications({ jobPostingId }) {
  const [page, setPage] = useState(0);
  const [workerStatuses, setWorkerStatuses] = useState({});

  const { jobApplications, isLoading, handleStatusChange, handleSave } = useJobApplicationStatuses(
    jobPostingId,
    workerStatuses,
    setWorkerStatuses,
  );
  if (isLoading) {
    return (
      <div>
        <h2 className="mb-3">Job Post Applications</h2>
        <div className="min-h-[200px]">
          <Skeleton count={5} height={40} />
        </div>
      </div>
    );
  }
  console.log("jobApplications", jobApplications);
  const totalPages = jobApplications?.totalPages;
  const isApplicationsEmpty = jobApplications?.totalElements === 0;

  return (
    <div>
      <h2 className="mb-3">Job Post Applications</h2>
      {isApplicationsEmpty ? (
        <p>No Applications</p>
      ) : (
        <>
          <div className="min-h-[13rem]">
            <HeadingGrid />
            <div>
              {jobApplications.content.map((worker, index) => (
                <div
                  key={index}
                  className="border-black-color/10 grid grid-cols-2 gap-4 border-b p-2 xl:grid-cols-6"
                >
                  <WorkerDetails worker={worker} />
                  <div>
                    <StatusSelector
                      worker={worker}
                      workerStatuses={workerStatuses}
                      handleStatusChange={handleStatusChange}
                    />
                  </div>
                  <WorkerActions
                    worker={worker}
                    workerStatuses={workerStatuses}
                    handleSave={handleSave}
                  />
                </div>
              ))}
            </div>
          </div>

          <Pagination totalPages={totalPages} setPage={setPage} page={page} isLoading={isLoading} />
        </>
      )}
    </div>
  );
}

// Prop validation
JobPostApplications.propTypes = {
  jobPostingId: PropTypes.string.isRequired,
};

export default JobPostApplications;
