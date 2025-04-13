import { useQuery } from "@tanstack/react-query";
import { getDigitalCvByUserId as getDigitalCvByUserId } from "../../../services/digitalCvService";
import { parseWorkerProfile } from "../util/parsedWorkerProfile";
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

  const parsedDigitalCv = parseWorkerProfile(digitalCv);
  if (parsedDigitalCv) {
    return { digitalCv: parsedDigitalCv, isLoading, isError };
  }
  return { digitalCv, isLoading, isError };
}
