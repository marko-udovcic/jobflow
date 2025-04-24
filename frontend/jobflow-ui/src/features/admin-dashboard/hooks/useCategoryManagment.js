import { useAddCategory } from "./useAddCategory";
import { useDeleteCategory } from "./useDeleteCategory";
export function useCategoryManagment(setNewCategory, newCategory) {
  const { addCategory } = useAddCategory();
  const { deleteCategory } = useDeleteCategory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: newCategory,
    };
    addCategory(data);
    setNewCategory("");
  };

  const handleDeleteCategory = (id) => {
    deleteCategory(id);
  };

  return {
    handleSubmit,
    handleDeleteCategory,
  };
}
