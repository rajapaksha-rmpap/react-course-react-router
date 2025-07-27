import { useRouteLoaderData } from "react-router-dom";

import EventForm from "../components/EventForm.js";

export default function EditEventPage() {
  const { isUserAuthenticated } = useRouteLoaderData("root");
  const data = useRouteLoaderData("event-detail");

  if (!isUserAuthenticated) {
    throw new Response("unauthorized action", { status: 404 });
  }

  return <EventForm method="PATCH" event={data.event} />;
}
