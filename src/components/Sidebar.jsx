import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/sideBar.css";

const Sidebar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const closeMenu = () => {
    setIsMenuActive(false);
  };

  return (
    <>
      {/* Navbar burger para móvil */}
      <nav className="navbar is-primary is-hidden-desktop">
        <div className="navbar-brand">
          <div
            className={`navbar-burger ${isMenuActive ? 'is-active' : ''}`}
            onClick={toggleMenu}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`menu p-4 sidebar-vertical-box ${isMenuActive ? 'is-active' : ''}`}>
        <p className="menu-label">Logo</p>
        <ul className="menu-list">
          <li>
            <Link to="/" onClick={closeMenu}>Inicio</Link>
          </li>
          <li>
            <Link to="/pacientes" onClick={closeMenu}>Pacientes</Link>
          </li>
          <li>
            <Link to="/actividades" onClick={closeMenu}>Actividades</Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
