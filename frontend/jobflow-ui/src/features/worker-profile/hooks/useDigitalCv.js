import { useQuery } from "@tanstack/react-query";
import { getDigitalCvByUserId as getDigitalCvByUserId } from "../../../services/digitalCvService";
export function useDigitalCv(userId) {
  const {
    data: digitalCv,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["digitalCv"],
    queryFn: () => getDigitalCvByUserId(userId),
    enabled: !!userId,
    retry: false,
  });

  return { digitalCv, isLoading, isError };
}
