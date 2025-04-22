import { getSuggestLocations as getSuggestLocationsApi } from "../../../services/jobPostingService";
import { useQuery } from "@tanstack/react-query";
export function useSuggestLocations(prefix) {
  return useQuery({
    queryKey: ["suggest-locations", prefix],
    queryFn: () => getSuggestLocationsApi(prefix),
    keepPreviousData: true,
    enabled: !!prefix && prefix.length >= 1,
    staleTime: 60000,
  });
}
