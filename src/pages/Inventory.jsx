import React, { useState } from "react";

const Inventory = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Product 1", quantity: 10, price: 50 },
    { id: 2, name: "Product 2", quantity: 5, price: 30 },
  ]);
  const [isEditing, setIsEditing] = useState(null);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", price: "" });

  const handleAddItem = () => {
    setInventory([
      ...inventory,
      {
        id: Date.now(),
        name: newItem.name,
        quantity: newItem.quantity,
        price: newItem.price,
      },
    ]);
    setNewItem({ name: "", quantity: "", price: "" });
  };

  const handleEditItem = (id) => {
    const item = inventory.find((item) => item.id === id);
    setNewItem({ name: item.name, quantity: item.quantity, price: item.price });
    setIsEditing(id);
  };

  const handleSaveItem = (id) => {
    setInventory(
      inventory.map((item) =>
        item.id === id
          ? {
              ...item,
              name: newItem.name,
              quantity: newItem.quantity,
              price: newItem.price,
            }
          : item
      )
    );
    setIsEditing(null);
    setNewItem({ name: "", quantity: "", price: "" });
  };

  const handleDeleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>Inventory Management</h1>
        <div className="search-add">
          <div className="search-box">
            <input type="text" placeholder="Search inventory..." />
          </div>
          <button className="add-button" onClick={() => setIsEditing("add")}>
            <span>Add New Item</span>
          </button>
        </div>
      </div>

      {isEditing === "add" || isEditing !== null ? (
        <div className="add-user-form">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item Name"
          />
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: e.target.value })
            }
            placeholder="Quantity"
          />
          <input
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            placeholder="Price"
          />
          <div className="form-buttons">
            <button
              className="save-button"
              onClick={() =>
                isEditing === "add"
                  ? handleAddItem()
                  : handleSaveItem(isEditing)
              }
            >
              {isEditing === "add" ? "Add Item" : "Save Changes"}
            </button>
            <button
              className="cancel-button"
              onClick={() => setIsEditing(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <div className="users-table">
        <div className="table-header">
          <div className="col">Name</div>
          <div className="col">Quantity</div>
          <div className="col">Price</div>
          <div className="col actions">Actions</div>
        </div>

        {inventory.map((item) => (
          <div className="table-row" key={item.id}>
            <div className="col" data-label="Name">
              {isEditing === item.id ? (
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                />
              ) : (
                item.name
              )}
            </div>
            <div className="col" data-label="Quantity">
              {isEditing === item.id ? (
                <input
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: e.target.value })
                  }
                />
              ) : (
                item.quantity
              )}
            </div>
            <div className="col" data-label="Price">
              {isEditing === item.id ? (
                <input
                  type="number"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                />
              ) : (
                item.price
              )}
            </div>
            <div className="col actions">
              {isEditing === item.id ? (
                <>
                  <button
                    className="save-button"
                    onClick={() => handleSaveItem(item.id)}
                  >
                    Save
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setIsEditing(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="edit-button"
                    onClick={() => handleEditItem(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
