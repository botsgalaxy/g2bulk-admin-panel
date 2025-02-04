import React, { useState } from "react";

const initialProducts = [
  { id: 1, name: "Laptop", price: 999, category: "Electronics" },
  { id: 2, name: "Smartphone", price: 699, category: "Electronics" },
  { id: 3, name: "Desk Chair", price: 199, category: "Furniture" },
];

function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleSave = () => {
    setEditingId(null);
  };

  const handleAdd = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setNewProduct({ name: "", price: "", category: "" });
      setIsAdding(false);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>Product Management</h1>
        <div className="search-add">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-button" onClick={() => setIsAdding(true)}>
            + Add Product
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="add-user-form">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
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
          <div className="col">Product Name</div>
          <div className="col">Price</div>
          <div className="col">Category</div>
          <div className="col actions">Actions</div>
        </div>

        {filteredProducts.map((product) => (
          <div key={product.id} className="table-row">
            <div className="col" data-label="Product Name">
              {editingId === product.id ? (
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => {
                    setProducts(
                      products.map((p) =>
                        p.id === product.id ? { ...p, name: e.target.value } : p
                      )
                    );
                  }}
                />
              ) : (
                product.name
              )}
            </div>
            <div className="col" data-label="Price">
              {editingId === product.id ? (
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => {
                    setProducts(
                      products.map((p) =>
                        p.id === product.id
                          ? { ...p, price: e.target.value }
                          : p
                      )
                    );
                  }}
                />
              ) : (
                `$${product.price}`
              )}
            </div>
            <div className="col" data-label="Category">
              {editingId === product.id ? (
                <input
                  type="text"
                  value={product.category}
                  onChange={(e) => {
                    setProducts(
                      products.map((p) =>
                        p.id === product.id
                          ? { ...p, category: e.target.value }
                          : p
                      )
                    );
                  }}
                />
              ) : (
                product.category
              )}
            </div>
            <div className="col actions">
              {editingId === product.id ? (
                <button className="save-button" onClick={handleSave}>
                  ✔ Save
                </button>
              ) : (
                <button
                  className="edit-button"
                  onClick={() => handleEdit(product.id)}
                >
                  ✎ Edit
                </button>
              )}
              <button
                className="delete-button"
                onClick={() => handleDelete(product.id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
