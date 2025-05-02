import { useQuery } from "@tanstack/react-query";
import { verifyEmail } from "../services/apiAuth";

export function useEmailVerification(token) {
  const {
    data: verificationResult,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["emailVerification", token],
    queryFn: () => verifyEmail(token),
    enabled: !!token,
    retry: 1,
    staleTime: Infinity, // Verification shouldn't need to be refetched
    cacheTime: 1000 * 60 * 10, // Cache result for 10 minutes
  });

  return {
    verificationResult,
    isLoading,
    isError,
    error,
  };
}
