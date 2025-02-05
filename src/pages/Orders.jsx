import React, { useState } from "react";
import ToastNotification from "../components/ToastNotification";
import DeleteConfirmation from "../components/DeleteConfirmation";

const initialOrders = [
  {
    id: 1,
    customer: "John Doe",
    date: "2024-02-01",
    total: 120.5,
    status: "Pending",
  },
  {
    id: 2,
    customer: "Jane Smith",
    date: "2024-02-02",
    total: 80,
    status: "Shipped",
  },
  {
    id: 3,
    customer: "Mike Johnson",
    date: "2024-02-03",
    total: 200,
    status: "Delivered",
  },
];

function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [toast, setToast] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const [newOrder, setNewOrder] = useState({
    customer: "",
    date: "",
    total: "",
    status: "Pending",
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
    setOrders(orders.filter((order) => order.id !== deleteItem));
    setDeleteItem(null);
    showToast("Order deleted successfully!", "success");
  };

  const cancelDelete = () => {
    setDeleteItem(null);
  };

  const handleSave = () => {
    setEditingId(null);
    showToast("Order updated successfully!", "success");
  };

  const handleAdd = () => {
    if (newOrder.customer && newOrder.date && newOrder.total) {
      setOrders([...orders, { ...newOrder, id: Date.now() }]);
      setNewOrder({ customer: "", date: "", total: "", status: "Pending" });
      setIsAdding(false);
      showToast("Order added successfully!", "success");
    }
  };

  const handleBulkDelete = () => {
    setOrders(orders.filter((order) => !selectedOrders.includes(order.id)));
    setSelectedOrders([]);
    showToast("Selected orders deleted!", "success");
  };

  const handleCheckboxChange = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>Order Management</h1>
        <div className="search-add">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-button" onClick={() => setIsAdding(true)}>
            + Add Order
          </button>
          {selectedOrders.length > 0 && (
            <button className="delete-button" onClick={handleBulkDelete}>
              🗑 Bulk Delete ({selectedOrders.length})
            </button>
          )}
        </div>
      </div>

      {isAdding && (
        <div className="add-user-form">
          <input
            type="text"
            placeholder="Customer Name"
            value={newOrder.customer}
            onChange={(e) =>
              setNewOrder({ ...newOrder, customer: e.target.value })
            }
          />
          <input
            type="date"
            value={newOrder.date}
            onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total Amount"
            value={newOrder.total}
            onChange={(e) =>
              setNewOrder({ ...newOrder, total: e.target.value })
            }
          />
          <select
            value={newOrder.status}
            onChange={(e) =>
              setNewOrder({ ...newOrder, status: e.target.value })
            }
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
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
          <div className="col">Customer</div>
          <div className="col">Date</div>
          <div className="col">Total</div>
          <div className="col">Status</div>
          <div className="col actions">Actions</div>
        </div>

        {filteredOrders.map((order) => (
          <div key={order.id} className="table-row">
            <div className="col">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(order.id)}
              />
            </div>
            <div className="col">{order.customer}</div>
            <div className="col">{order.date}</div>
            <div className="col">${order.total.toFixed(2)}</div>
            <div className="col">
              {editingId === order.id ? (
                <select
                  defaultValue={order.status}
                  onChange={(e) => {
                    const updatedOrders = orders.map((o) =>
                      o.id === order.id ? { ...o, status: e.target.value } : o
                    );
                    setOrders(updatedOrders);
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              ) : (
                order.status
              )}
            </div>
            <div className="col actions">
              {editingId === order.id ? (
                <button className="save-button" onClick={handleSave}>
                  ✔ Save
                </button>
              ) : (
                <button
                  className="edit-button"
                  onClick={() => handleEdit(order.id)}
                >
                  ✎ Edit
                </button>
              )}
              <button
                className="delete-button"
                onClick={() => handleDelete(order.id)}
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
          itemName="Order"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default Orders;
