import { NavLink } from "react-router-dom";

import NewsletterSignup from "./NewsletterSignup.jsx";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav className={classes.navbar}>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Newsletter
            </NavLink>
          </li>
        </ul>
        <NewsletterSignup />
      </nav>
    </header>
  );
}

export default MainNavigation;
