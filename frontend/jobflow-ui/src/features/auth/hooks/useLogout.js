import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser as logoutApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      queryClient.removeQueries(["currentUser"]);
      setUser(null);
      navigate("/login", { replace: true });
    },
  });
  return { logout, isLoading };
}
