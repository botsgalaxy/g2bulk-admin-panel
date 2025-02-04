import { useRef, useEffect } from "react";
// import UserDropdown from "./UserDropdown";

export default function Header({ toggleSidebar }) {
  const searchRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <a href="/">LOGO</a>
        </div>

        <div className="toggle-nav" id="toggle-nav" onClick={toggleSidebar}>
          <i className="bx bx-menu"></i>
        </div>

        <div className="header-search-bar">
          <div className="header-search-box">
            <div className="header-search-icon">
              <i className="bx bx-search"></i>
            </div>
            <div className="header-search-input">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search..."
                id="search-terms"
              />
            </div>
            <div className="header-search-shortcut">
              <p>Ctrl K</p>
            </div>
          </div>
        </div>

        <div className="user-quick-info">
          <div className="account-notification">
            <p>
              <i className="bx bx-user"></i>
            </p>
          </div>
          {/* <UserDropdown /> */}
        </div>
      </div>
    </header>
  );
}
