import { useQuery } from "@tanstack/react-query";
import { getStatistics as getStatisticsApi } from "../../../services/adminDashboardService";
import { useAuthStore } from "../../../store/useAuthStore";
export function useStatistics() {
  const { currentUser } = useAuthStore();
  const isEmptyUser = Object.keys(currentUser || {}).length === 0;
  const {
    data: statistics,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: () => getStatisticsApi(),
    retry: false,
    enabled: !isEmptyUser,
  });

  return { statistics, isLoading, error, isError };
}
