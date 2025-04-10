import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addDigitalCv as addDigitalCvApi } from "../../../services/digitalCvService";
export function useCreateCv() {
  const navigate = useNavigate();

  const { mutate: createCV, isLoading } = useMutation({
    mutationFn: addDigitalCvApi,
    onSuccess: () => {
      navigate("/worker/profile", { replace: true });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { createCV, isLoading };
}
