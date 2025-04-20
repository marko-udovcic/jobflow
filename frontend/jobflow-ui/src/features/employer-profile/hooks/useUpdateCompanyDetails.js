import { updateCompanyDetails as updateCompanyDetailsApi } from "../../../services/userService";
import { useMutation } from "@tanstack/react-query";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";

export function useUpdateCompanyDetails() {
  const { refetch } = useCurrentUser();

  const mutation = useMutation({
    mutationFn: updateCompanyDetailsApi,
    onSuccess: () => {
      console.log("Company details updated successfully");
      refetch();
    },
  });

  return {
    updateCompanyDetails: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
}
