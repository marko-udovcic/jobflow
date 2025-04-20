import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser as loginUserApi } from "../services/apiAuth";
import { useAuthStore } from "../../../store/useAuthStore";
export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoggedOut = useAuthStore((state) => state.setLoggedOut);
  const navigate = useNavigate();

  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: loginUserApi,

    onSuccess: ({ roles }) => {
      const role = roles[0];

      setLoggedOut(false);
      setUser(null);
      redirectUser(role);
    },
  });

  function redirectUser(role) {
    switch (role) {
      case "ADMIN":
        navigate("/admin/dashboard", { replace: true });
        break;
      case "WORKER":
        navigate("/worker/profile", { replace: true });
        break;
      case "EMPLOYER":
        navigate("/employer/profile", { replace: true });
        break;
      default:
        navigate("/login", { replace: true });
        break;
    }
  }
  return { login, isLoading, error };
}
