import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJobApplicationStatus as updateApplicationStatusApi } from "../../../services/jobApplications";
export function useUpdateApplicationStatus(page, jobPostingId) {
  const queryClient = useQueryClient();
  const {
    mutate: updateApplicationStatus,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (data) => updateApplicationStatusApi(data),
    onSuccess: () => {
      console.log("Application status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["applications", page, jobPostingId] });
    },
  });
  return { updateApplicationStatus, isLoading, error };
}
