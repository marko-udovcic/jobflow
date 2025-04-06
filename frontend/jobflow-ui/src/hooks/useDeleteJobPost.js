import { useMutation } from "@tanstack/react-query";
import { deleteJobPosting as deleteJobPostingApi } from "../services/jobPostingService";
import { useQueryClient } from "@tanstack/react-query";
export function useDeleteJobPost() {
  const queryClient = useQueryClient();
  const { mutate: deleteJobPost } = useMutation({
    mutationFn: (jobPostingId) => deleteJobPostingApi(jobPostingId),
    onSuccess: () => {
      console.log("Job post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["companyJobsList"] });
    },
  });
  return { deleteJobPost };
}
