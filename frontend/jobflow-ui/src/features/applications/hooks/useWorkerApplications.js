import { useQuery } from "@tanstack/react-query";
import { getJobApplicationsByWorkerId as getWorkerApplicationsApi } from "../../../services/jobApplications";
export function useWorkerApplications(workerId) {
  const { data: workerApplications, isLoading } = useQuery({
    queryKey: ["workerApplications"],
    queryFn: () => getWorkerApplicationsApi(workerId),
    enabled: !!workerId,
  });

  return { workerApplications, isLoading };
}
