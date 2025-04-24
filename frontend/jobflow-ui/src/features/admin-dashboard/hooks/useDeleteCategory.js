import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCategory as deleteCategoryApi } from "../../../services/categoryService";
import { toast } from "react-toastify";
export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { mutate: deleteCategory } = useMutation({
    mutationFn: (categoryId) => deleteCategoryApi(categoryId),
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  return { deleteCategory };
}
