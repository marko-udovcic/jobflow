import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { addCategory as addCategoryApi } from "../../../services/categoryService";
import { toast } from "react-toastify";

export function useAddCategory() {
  const queryClient = useQueryClient();
  const { mutate: addCategory } = useMutation({
    mutationFn: addCategoryApi,
    onSuccess: () => {
      toast.success("Category added successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  return { addCategory };
}
