import { useQuery } from "@tanstack/react-query";
import { getJobPostingById as getJobPostingByIdApi } from "../../../services/jobPostingService";
export function useJobPost(jobPostingId) {
  const { data: jobPost, isLoading } = useQuery({
    queryKey: ["jobPosting", jobPostingId],
    queryFn: () => getJobPostingByIdApi(jobPostingId),
    enabled: !!jobPostingId,
  });

  return { jobPost, isLoading };
}
