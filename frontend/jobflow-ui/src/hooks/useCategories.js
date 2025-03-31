import { useQuery } from "@tanstack/react-query";
import { getCategories as getCategoriesApi } from "../services/categoryService";
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesApi,
    staleTime: 30 * 60 * 1000, // 30mins
  });
}
