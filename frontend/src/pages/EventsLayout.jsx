import { Outlet } from "react-router-dom";

import EventsNavigation from "../components/EventsNavigation.js";

export default function EventsLayout() {
  return (
    <>
      <Outlet />
      <EventsNavigation />
    </>
  );
}
