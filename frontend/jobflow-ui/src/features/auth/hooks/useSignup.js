import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { signUpUser as signUpUserApi } from "../services/apiAuth";
import { toast } from "react-toastify";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpUserApi,
    onSuccess: (data) => {
      toast.success(
        data.message ||
          "User registered successfully! Please check your email for account verification.",
      );

      setTimeout(() => {
        navigate("/login");
      }, 5000);
    },
    onError: (err) => {
      console.error("Signup failed:", err);
    },
  });
  return { signUp, isLoading };
}
