import { updateCompanyDetails as updateCompanyDetailsApi } from "../../../services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCompanyDetails() {
  const queryClient = useQueryClient();
  const {
    mutate: updateCompanyDetails,
    isLoading,
    error,
  } = useMutation({
    mutationFn: updateCompanyDetailsApi,
    onSuccess: () => {
      console.log("Company details updated successfully");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
  return { updateCompanyDetails, isLoading, error };
}
