import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const getClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-item active" : "nav-item";

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="logo">MyBlog</div>

        <div className="nav-links">
          <NavLink to="/" className={getClass}>
            Home
          </NavLink>

          <NavLink to="/about" className={getClass}>
            About
          </NavLink>

          <NavLink to="/admin/posts" className={getClass}>
            Admin
          </NavLink>

          <NavLink to="/admin/tags" className={getClass}>
            Tags
          </NavLink>
        </div>

      </div>
    </nav>
  );
}