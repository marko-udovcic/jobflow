import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { searchUser as searchUserApi } from "../../../services/adminDashboardService";
export function useUserSearch(email = "", page, size) {
  return useQuery({
    queryKey: ["users", "search"],
    queryFn: () => searchUserApi(email, page, size),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}
