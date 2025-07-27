import { useRouteLoaderData, Link, NavLink, Form } from "react-router-dom";
// import { useSelector } from "react-redux";

import NewsletterSignup from "./NewsletterSignup.jsx";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  // const userLoggedIn = useSelector((state) => state.auth.authenticated);
  const { isUserAuthenticated } = useRouteLoaderData("root"); // path - "/"

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
        <div className={classes.authActions}>
          {!isUserAuthenticated && (
            <Link to="/auth?mode=signup" className={classes.navButton}>
              Sign up
            </Link>
          )}
          {isUserAuthenticated && (
            <Form action="/logout" method="POST">
              <button type="submit" className={classes.navButton}>
                Log out
              </button>
            </Form>
          )}
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
