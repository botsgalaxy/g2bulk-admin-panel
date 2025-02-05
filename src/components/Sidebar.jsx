import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, closeSidebar }) {
  const mainMenu = [
    { path: "/", name: "Home", icon: "bx-home-alt" },
    { path: "/categories", name: "Categories", icon: "bx bx-category" },
    { path: "/products", name: "Products", icon: "bx-purchase-tag" },
    { path: "/orders", name: "Orders", icon: "bx-store" },
    { path: "/users", name: "Users", icon: "bx-group" },
    { path: "/inventory", name: "inventory", icon: "bx-trending-up" }
  ];
  

  return (
    <aside>
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <button className="sidebar-close" onClick={closeSidebar}>
          <i className="bx bx-x"></i>
        </button>
        <nav>
          <div className="main-nav">
            <div className="menu">
              <p className="title">Main</p>
              <ul>
                {mainMenu.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={closeSidebar}
                    >
                      <i className={`bx ${item.icon}`}></i>
                      <span className="item-name">{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
