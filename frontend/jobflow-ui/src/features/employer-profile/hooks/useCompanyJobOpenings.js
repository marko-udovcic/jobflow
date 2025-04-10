import { getJobPostingsByCompanyId as getCompanyJobOpeningsListApi } from "../../../services/jobPostingService";
import { useQuery } from "@tanstack/react-query";
export function useCompanyJobOpenings(companyId) {
  const { data: companyJobsList, isLoading } = useQuery({
    queryKey: ["companyJobsList"],
    queryFn: () => getCompanyJobOpeningsListApi(companyId),
    enabled: !!companyId,
  });

  return { companyJobsList, isLoading };
}
