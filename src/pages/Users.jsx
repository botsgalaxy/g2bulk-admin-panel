import React, { useState } from "react";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Editor" },
];

function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSave = () => {
    setEditingId(null);
  };

  const handleAdd = () => {
    if (newUser.name && newUser.email && newUser.role) {
      setUsers([...users, { ...newUser, id: Date.now() }]);
      setNewUser({ name: "", email: "", role: "" });
      setIsAdding(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>User Management</h1>
        <div className="search-add">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-button" onClick={() => setIsAdding(true)}>
            + Add User
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="add-user-form">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
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
          <div className="col">Name</div>
          <div className="col">Email</div>
          <div className="col">Role</div>
          <div className="col actions">Actions</div>
        </div>

        {filteredUsers.map((user) => (
          <div key={user.id} className="table-row">
            <div className="col" data-label="Name">
              {editingId === user.id ? (
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => {
                    setUsers(
                      users.map((u) =>
                        u.id === user.id ? { ...u, name: e.target.value } : u
                      )
                    );
                  }}
                />
              ) : (
                user.name
              )}
            </div>
            <div className="col" data-label="Email">
              {editingId === user.id ? (
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => {
                    setUsers(
                      users.map((u) =>
                        u.id === user.id ? { ...u, email: e.target.value } : u
                      )
                    );
                  }}
                />
              ) : (
                user.email
              )}
            </div>
            <div className="col" data-label="Role">
              {editingId === user.id ? (
                <input
                  type="text"
                  value={user.role}
                  onChange={(e) => {
                    setUsers(
                      users.map((u) =>
                        u.id === user.id ? { ...u, role: e.target.value } : u
                      )
                    );
                  }}
                />
              ) : (
                user.role
              )}
            </div>
            <div className="col actions">
              {editingId === user.id ? (
                <button className="save-button" onClick={handleSave}>
                  ✔ Save
                </button>
              ) : (
                <button
                  className="edit-button"
                  onClick={() => handleEdit(user.id)}
                >
                  ✎ Edit
                </button>
              )}
              <button
                className="delete-button"
                onClick={() => handleDelete(user.id)}
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

export default Users;
