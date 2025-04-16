import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateDigitalCv as updateDigitalCvApi } from "../../../services/digitalCvService";
export function useUpdateCv() {
  const navigate = useNavigate();

  const { mutate: updateCV, isLoading } = useMutation({
    mutationFn: updateDigitalCvApi,
    onSuccess: () => {
      navigate("/worker/profile", { replace: true });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { updateCV, isLoading };
}
