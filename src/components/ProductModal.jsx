import { useState } from "react";

const ProductModal = ({ product, categories, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    sku: product?.sku || "",
    description: product?.description || "",
    category: product?.category || categories[0]?.name || "",
    originalPrice: product?.originalPrice || "",
    discountPrice: product?.discountPrice || "",
    stock: product?.stock || 0,
    status: product?.status || "draft",
    images: product?.images || [""],
    specifications: product?.specifications || {
      brand: "",
      color: "",
      weight: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      originalPrice: parseFloat(formData.originalPrice),
      discountPrice: formData.discountPrice
        ? parseFloat(formData.discountPrice)
        : null,
      stock: parseInt(formData.stock),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="management-modal">
        <div className="modal-header">
          <h2>{product ? "Edit Product" : "Create New Product"}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>SKU *</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="form-group">
              <label>Original Price ($) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) =>
                  setFormData({ ...formData, originalPrice: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Discount Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.discountPrice || ""}
                onChange={(e) =>
                  setFormData({ ...formData, discountPrice: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Stock Quantity *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="4"
              />
            </div>

            <div className="form-group full-width">
              <label>Product Images</label>
              <input
                type="url"
                value={formData.images[0]}
                onChange={(e) =>
                  setFormData({ ...formData, images: [e.target.value] })
                }
                placeholder="Image URL"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {product ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
