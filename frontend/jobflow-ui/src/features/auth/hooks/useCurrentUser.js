import { getCurrentUser as getCurrentUserApi } from "../services/apiAuth";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/useAuthStore";
import { useEffect } from "react";
export function useCurrentUser() {
  let currentUser = useAuthStore((state) => state.currentUser);
  let setUser = useAuthStore((state) => state.setUser);

  const { data, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserApi,
    enabled: currentUser !== null,
  });
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return { currentUser, isLoading };
}
