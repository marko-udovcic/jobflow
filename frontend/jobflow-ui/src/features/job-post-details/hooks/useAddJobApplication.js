import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addJobApplication as addJobApplicationApi } from "../../../services/jobApplications";

export function useAddJobApplication() {
  const { mutate: createJobApplication, isLoading } = useMutation({
    mutationFn: addJobApplicationApi,
    onSuccess: () => {
      toast.success("Application sent successfully.");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to send application. Please try again.");
    },
  });

  return { createJobApplication, isLoading };
}
