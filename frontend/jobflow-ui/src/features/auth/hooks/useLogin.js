import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser as loginUserApi } from "../services/apiAuth";
import { useAuthStore } from "../../../store/useAuthStore";
export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: ({ roles }) => {
      const role = roles[0];
      setUser({});
      redirectUser(role);
    },
    onError: (err) => {
      console.error(err);
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
