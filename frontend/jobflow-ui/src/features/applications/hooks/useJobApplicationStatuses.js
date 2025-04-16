import { useEffect } from "react";
import { useJobApplications } from "./useJobApplications";
import { useUpdateApplicationStatus } from "./useUpdateApplicationStatus";

export function useJobApplicationStatuses(page, jobPostingId, workerStatuses, setWorkerStatuses) {
  const { jobApplications, isLoading } = useJobApplications(page, jobPostingId);
  const { updateApplicationStatus } = useUpdateApplicationStatus(page, jobPostingId);

  useEffect(() => {
    if (jobApplications?.content) {
      const initialStatuses = {};
      jobApplications.content.forEach((worker) => {
        initialStatuses[worker.workerId] = worker.applicationStatus;
      });
      setWorkerStatuses(initialStatuses);
    }
  }, [jobApplications?.content, setWorkerStatuses]);

  const handleStatusChange = (workerId, newStatus) => {
    setWorkerStatuses((prevStatuses) => ({
      ...prevStatuses,
      [workerId]: newStatus,
    }));
  };

  const handleSave = (workerId, message) => {
    const newStatus = workerStatuses[workerId];
    message =
      message.trim().length === 0 ? `Default Message: You are ${newStatus.toLowerCase()}` : message;
    console.log(
      `Saving changes for worker ${workerId} with status: ${newStatus} and message: ${message}`,
    );

    const data = {
      id: jobApplications.content.find((worker) => worker.workerId === workerId).jobApplicationId,
      applicationStatus: newStatus,
      message: message,
    };

    updateApplicationStatus(data);
  };

  return { jobApplications, isLoading, workerStatuses, handleStatusChange, handleSave };
}
