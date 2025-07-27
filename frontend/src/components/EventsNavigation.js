import { useRouteLoaderData, Link } from "react-router-dom";

import classes from "./EventsNavigation.module.css";

function EventsNavigation() {
  const { isUserAuthenticated } = useRouteLoaderData("root");

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <Link to="/events">All Events</Link>
          </li>
          {isUserAuthenticated && (
            <li>
              <Link to="/events/new">New Event</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
