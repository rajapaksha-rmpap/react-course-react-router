import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/products" end>
            Products
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
