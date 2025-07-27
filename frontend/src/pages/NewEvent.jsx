import { useRouteLoaderData } from "react-router-dom";

import EventForm from "../components/EventForm.js";

export default function NewEventPage() {
  const { isUserAuthenticated } = useRouteLoaderData("root");
  if (!isUserAuthenticated) {
    throw new Response("unauthorized action", { status: 404 });
  }

  return <EventForm method="POST" />;
}
