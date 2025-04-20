import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getJobApplicationsByJobPostingId as getJobApplicationsByJobPostApi } from "../../../services/jobApplications";
export function useJobApplications(page, jobPostingId) {
  const {
    data: jobApplications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["applications", page, jobPostingId],
    queryFn: () => getJobApplicationsByJobPostApi(jobPostingId, page),
    placeholderData: keepPreviousData,
  });
  return { jobApplications, isLoading, isError };
}
