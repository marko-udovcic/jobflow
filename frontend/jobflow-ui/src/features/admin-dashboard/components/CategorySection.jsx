import { useCategories } from "../../../hooks/useCategories";
import CategoryFormWithList from "./CategoryFormWithList";
import CompoundModal from "../../../components/ui/CompoundModal";
import Button from "../../../components/ui/Button";
function CategorySection() {
  const { data: categories, isLoading } = useCategories();
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="my-3">Categories</h2>
      <CompoundModal>
        <CompoundModal.Open opens="add-category">
          <Button variant="primary">Add Category</Button>
        </CompoundModal.Open>
        <CompoundModal.Window name="add-category">
          <CategoryFormWithList categories={categories} />
        </CompoundModal.Window>
      </CompoundModal>
    </div>
  );
}

export default CategorySection;
