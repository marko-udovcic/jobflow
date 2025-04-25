import { getSuggestJobTitles as getSuggestJobTitlesApi } from "../../../services/jobPostingService";
import { useQuery } from "@tanstack/react-query";
export function useSuggestTitles(prefix) {
  return useQuery({
    queryKey: ["suggest-titles", prefix],
    queryFn: () => getSuggestJobTitlesApi(prefix),
    keepPreviousData: true,
    enabled: !!prefix && prefix.length >= 1,
    staleTime: 60000,
  });
}
