import { useState } from "react";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="user-profile"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="avatar-dropdown">
        {/* <i className="bx bx-user user-avatar"></i> */}
        <div className={`dropdown-content ${isOpen ? "active" : ""}`}>
          <div className="user-details">
            <h4 className="user-name">Ahmed sohel</h4>
            <p className="user-role">Admin</p>
          </div>
          <a href="#">
            <i className="bx bx-edit-alt"></i>
            <span>Edit Profile</span>
          </a>
          <a href="#">
            <i className="bx bx-moon"></i>
            <span className="item-name">Dark Mode</span>
          </a>
          <a href="#">
            <i className="bx bx-log-in-circle"></i>
            <span>Log out</span>
          </a>
        </div>
      </div>
    </div>
  );
}
