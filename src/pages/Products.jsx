import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ProductModal from "../components/ProductModal";
import DeleteConfirmation from "../components/DeleteConfirmation";
import ToastNotification from "../components/ToastNotification";

const Products = ({ categories }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [toast, setToast] = useState(null);

  
  // Mock initial products
  useEffect(() => {
    setProducts([
      {
        id: nanoid(),
        name: "Headphone",
        sku: "ELECT-001",
        description: "Noise-cancelling Bluetooth headphones",
        category: "Electronics",
        originalPrice: 299.99,
        discountPrice: 249.99,
        stock: 50,
        status: "published",
        images: [
          "https://sonysmart.com.bd/public/uploads/all/LtlOEyZpKOeL4MuNaGm3oya2r9OfiwOud10VugTO.png",
        ],
        specifications: {
          brand: "AudioMaster",
          color: "Black",
          wireless: true,
        },
      },
      {
        id: nanoid(),
        name: "Headphone",
        sku: "ELECT-001",
        description: "Noise-cancelling Bluetooth headphones",
        category: "Electronics",
        originalPrice: 299.99,
        discountPrice: 249.99,
        stock: 50,
        status: "published",
        images: [
          "https://images-cdn.ubuy.co.in/64f88d2caa808e2fe4623635-bluetooth-headphones-over-ear-wireless.jpg",
        ],
        specifications: {
          brand: "AudioMaster",
          color: "Black",
          wireless: true,
        },
      },
      {
        id: nanoid(),
        name: "Headphone",
        sku: "ELECT-001",
        description: "Noise-cancelling Bluetooth headphones",
        category: "Electronics",
        originalPrice: 299.99,
        discountPrice: 249.99,
        stock: 50,
        status: "published",
        images: [
          "https://www.globalbrand.com.bd/image/cache/catalog/HEADPHONE/A4TECH/A4Tech-Fstyler-BH220-Bluetooth-Wireless-Headphone-320x320.jpg",
        ],
        specifications: {
          brand: "AudioMaster",
          color: "Black",
          wireless: true,
        },
      },
    ]);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("Product deleted successfully", "success");
    setProductToDelete(null);
  };

  const handleBulkDelete = () => {
    setProducts((prev) => prev.filter((p) => !selectedProducts.includes(p.id)));
    setSelectedProducts([]);
    showToast("Selected products deleted", "success");
  };

  const handleSubmit = (productData) => {
    if (currentProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === currentProduct.id ? { ...p, ...productData } : p
        )
      );
      showToast("Product updated successfully", "success");
    } else {
      setProducts((prev) => [...prev, { id: nanoid(), ...productData }]);
      showToast("Product added successfully", "success");
    }
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-management">
      {toast && <ToastNotification {...toast} />}

      <div className="management-header">
        <div>
          <h1>Product Management</h1>
          <p className="product-count">
            {filteredProducts.length} products listed
          </p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + Add Product
        </button>
      </div>

      <div className="management-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="filters">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedProducts.length > 0 && (
        <div className="bulk-actions">
          <button
            className="btn-danger"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete selected products?"
                )
              ) {
                handleBulkDelete();
              }
            }}
          >
            Delete Selected ({selectedProducts.length})
          </button>
        </div>
      )}

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Pricing</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() =>
                      setSelectedProducts((prev) =>
                        prev.includes(product.id)
                          ? prev.filter((id) => id !== product.id)
                          : [...prev, product.id]
                      )
                    }
                  />
                </td>
                <td className="product-info">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-thumb"
                  />
                  <div>
                    <h4>{product.name}</h4>
                    <p className="product-sku">{product.sku}</p>
                  </div>
                </td>
                <td>{product.sku}</td>
                <td>{product.category}</td>
                <td>
                  <div className="pricing">
                    <span className="original-price">
                      ${product.originalPrice}
                    </span>
                    {product.discountPrice && (
                      <span className="discount-price">
                        ${product.discountPrice}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <span
                    className={`stock-status ${
                      product.stock > 0 ? "in-stock" : "out-stock"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${product.status}`}>
                    {product.status}
                  </span>
                </td>
                <td className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => {
                      setCurrentProduct(product);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => setProductToDelete(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ProductModal
          product={currentProduct}
          categories={categories}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentProduct(null);
          }}
          onSubmit={handleSubmit}
        />
      )}

      {productToDelete && (
        <DeleteConfirmation
          itemName={productToDelete.name}
          onConfirm={() => handleDelete(productToDelete.id)}
          onCancel={() => setProductToDelete(null)}
        />
      )}
    </div>
  );
};

export default Products;
