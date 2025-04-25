import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { updateUserStatus as updateUserStatusApi } from "../../../services/adminDashboardService";
import { toast } from "react-toastify";

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  const { mutate: updateUserStatus } = useMutation({
    mutationFn: ({ userId, enabled }) => updateUserStatusApi(userId, enabled),
    onSuccess: () => {
      toast.success("User status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users", "search"] });
    },
  });
  return { updateUserStatus };
}
