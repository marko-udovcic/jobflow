import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { signUpUser as signUpUserApi } from "../services/apiAuth";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpUserApi,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (err) => {
      console.error("Signup failed:", err);
    },
  });
  return { signUp, isLoading };
}
