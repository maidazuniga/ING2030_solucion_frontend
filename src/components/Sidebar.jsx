import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="menu p-4 has-background-light" style={{ height: '100vh', borderRight: '1px solid #dbdbdb' }}>
      <p className="menu-label">General</p>
      <ul className="menu-list">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/pacientes">Pacientes</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
