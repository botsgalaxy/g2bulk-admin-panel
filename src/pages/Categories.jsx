import React, { useState } from "react";
import ToastNotification from "../components/ToastNotification";
import DeleteConfirmation from "../components/DeleteConfirmation";

const initialCategories = [
  { id: 1, name: "Electronics", description: "Devices and gadgets" },
  { id: 2, name: "Furniture", description: "Home and office furniture" },
  { id: 3, name: "Clothing", description: "Men and Women fashion" },
];

function Category() {
  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [toast, setToast] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const [isAdding, setIsAdding] = useState(false);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleDelete = (id) => {
    setDeleteItem(id);
  };

  const confirmDelete = () => {
    setCategories(categories.filter((category) => category.id !== deleteItem));
    setDeleteItem(null);
    showToast("Category deleted successfully!", "success");
  };

  const cancelDelete = () => {
    setDeleteItem(null);
  };

  const handleSave = () => {
    setEditingId(null);
    showToast("Category updated successfully!", "success");
  };

  const handleAdd = () => {
    if (newCategory.name && newCategory.description) {
      setCategories([...categories, { ...newCategory, id: Date.now() }]);
      setNewCategory({ name: "", description: "" });
      setIsAdding(false);
      showToast("Category added successfully!", "success");
    }
  };

  const handleBulkDelete = () => {
    setCategories(
      categories.filter((category) => !selectedCategories.includes(category.id))
    );
    setSelectedCategories([]);
    showToast("Selected categories deleted!", "success");
  };

  const handleCheckboxChange = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>Category Management</h1>
        <div className="search-add">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-button" onClick={() => setIsAdding(true)}>
            + Add Category
          </button>
          {selectedCategories.length > 0 && (
            <button className="delete-button" onClick={handleBulkDelete}>
              🗑 Bulk Delete ({selectedCategories.length})
            </button>
          )}
        </div>
      </div>

      {isAdding && (
        <div className="add-user-form">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
          />
          <div className="form-buttons">
            <button className="save-button" onClick={handleAdd}>
              ✔ Save
            </button>
            <button
              className="cancel-button"
              onClick={() => setIsAdding(false)}
            >
              ✖ Cancel
            </button>
          </div>
        </div>
      )}

      <div className="users-table">
        <div className="table-header">
          <div className="col">
            <input type="checkbox" disabled />
          </div>
          <div className="col">Category Name</div>
          <div className="col">Description</div>
          <div className="col actions">Actions</div>
        </div>

        {filteredCategories.map((category) => (
          <div key={category.id} className="table-row">
            <div className="col">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(category.id)}
              />
            </div>
            <div className="col">
              {editingId === category.id ? (
                <input
                  type="text"
                  defaultValue={category.name}
                  onChange={(e) => {
                    const updatedCategories = categories.map((c) =>
                      c.id === category.id ? { ...c, name: e.target.value } : c
                    );
                    setCategories(updatedCategories);
                  }}
                />
              ) : (
                category.name
              )}
            </div>
            <div className="col">
              {editingId === category.id ? (
                <input
                  type="text"
                  defaultValue={category.description}
                  onChange={(e) => {
                    const updatedCategories = categories.map((c) =>
                      c.id === category.id
                        ? { ...c, description: e.target.value }
                        : c
                    );
                    setCategories(updatedCategories);
                  }}
                />
              ) : (
                category.description
              )}
            </div>
            <div className="col actions">
              {editingId === category.id ? (
                <button className="save-button" onClick={handleSave}>
                  ✔ Save
                </button>
              ) : (
                <button
                  className="edit-button"
                  onClick={() => handleEdit(category.id)}
                >
                  ✎ Edit
                </button>
              )}
              <button
                className="delete-button"
                onClick={() => handleDelete(category.id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {toast && <ToastNotification message={toast.message} type={toast.type} />}
      {deleteItem && (
        <DeleteConfirmation
          itemName="Category"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default Category;
