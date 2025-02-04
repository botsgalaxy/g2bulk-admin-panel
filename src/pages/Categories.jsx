import { useState } from "react";
import { nanoid } from "nanoid";
import ToastNotification from "../components/ToastNotification";

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: nanoid(), name: "Electronics", slug: "electronics", products: 15 },
    { id: nanoid(), name: "Fashion", slug: "fashion", products: 42 },
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [toast, setToast] = useState(null);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setCategories((prev) => [
      ...prev,
      {
        id: nanoid(),
        name: newCategory,
        slug: newCategory.toLowerCase().replace(/\s+/g, "-"),
        products: 0,
      },
    ]);

    setNewCategory("");
    showToast("Category added successfully");
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="categories-management">
      {toast && <ToastNotification {...toast} />}

      <div className="management-header">
        <h1>Category Management</h1>
        <form onSubmit={handleAddCategory} className="category-form">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            required
          />
          <button type="submit" className="btn-primary">
            + Add Category
          </button>
        </form>
      </div>

      <div className="categories-table-container">
        <table className="categories-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Slug</th>
              <th>Products</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>{category.products}</td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button
                    className="btn-danger"
                    onClick={() => {
                      if (
                        window.confirm(`Delete category "${category.name}"?`)
                      ) {
                        setCategories((prev) =>
                          prev.filter((c) => c.id !== category.id)
                        );
                        showToast("Category deleted", "success");
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
