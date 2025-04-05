import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addJobPosting as addJobPostingApi } from "../../../services/jobPostingService";

export function useCreateJobPost() {
  const navigate = useNavigate();

  const { mutate: createJobPost, isLoading } = useMutation({
    mutationFn: addJobPostingApi,
    onSuccess: () => {
      navigate("/employer/profile", { replace: true });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { createJobPost, isLoading };
}
