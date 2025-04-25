import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useCategoryManagment } from "../hooks/useCategoryManagment";
import CompoundModal, { ModalContext } from "../../../components/ui/CompoundModal";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import useOutsideClick from "../../../hooks/useOutsideClick";
import PropTypes from "prop-types";
import { useContext } from "react";

function CategoryFormWithList({ categories = [] }) {
  const [newCategory, setNewCategory] = useState("");

  const { close } = useContext(ModalContext);
  const ref = useOutsideClick(() => {
    close();
  });
  const { handleSubmit, handleDeleteCategory } = useCategoryManagment(setNewCategory, newCategory);

  return (
    <div className="p-4" ref={ref}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="ml-1 text-xl font-semibold">Manage Categories</h2>
        <CompoundModal.Close>
          <Button variant="" className="cursor-pointer p-2 text-3xl">
            <IoCloseOutline />
          </Button>
        </CompoundModal.Close>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-2 flex">
          <Input
            variant={"primary"}
            type="text"
            placeholder="Enter category name"
            className="input mr-2.5 flex-grow"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
          />

          <Button variant="primary" type="submit" disabled={!newCategory}>
            Add
          </Button>
        </div>
      </form>

      <div className="rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 gap-4 rounded-t-lg border-b border-gray-200 p-3">
          <div className="font-medium">Category Name</div>
          <div className="text-right font-medium">Actions</div>
        </div>

        <div className="max-h-60 divide-y divide-gray-200 overflow-y-auto">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category.id}
                className="grid grid-cols-2 items-center gap-4 p-3 hover:bg-gray-50"
              >
                <div>{category.name}</div>
                <div className="flex justify-end">
                  <Button variant="danger" onClick={() => handleDeleteCategory(category.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500">
              No categories found. Add your first category above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

CategoryFormWithList.propTypes = {
  categories: PropTypes.array,
};

export default CategoryFormWithList;
