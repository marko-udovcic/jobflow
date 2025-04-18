import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/useAuthStore";
import { useEffect } from "react";
import { getCurrentUser } from "../services/apiAuth";

export function useCurrentUser() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const setUser = useAuthStore((state) => state.setUser);
  const isLoggedOut = useAuthStore((state) => state.isLoggedOut);
  const setLoading = useAuthStore((state) => state.setLoading);

  const shouldFetch = currentUser === null || (currentUser === undefined && !isLoggedOut);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: shouldFetch,
  });

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (data) {
      setUser(data);
    }

    if (isError) {
      setUser(undefined);
    }
  }, [data, isError, error, setUser, setLoading, isLoading]);

  return {
    currentUser,
    isLoading,
    isError,
    refetch,
  };
}
