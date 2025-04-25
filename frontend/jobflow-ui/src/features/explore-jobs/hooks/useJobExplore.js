import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getExploreJobPostings as getExploreJobPostingsApi } from "../../../services/jobPostingService";
export function useJobExplore({ title, location, page = 0, size = 10 }) {
  return useQuery({
    queryKey: ["jobs", title, location, page, size],
    queryFn: () => getExploreJobPostingsApi({ title, location, page, size }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: false,
  });
}
