import { useParams } from "react-router-dom";

import { DUMMY_EVENTS } from "../App.js";

export default function EventDetailPage() {
  const { id: eventId } = useParams();

  const event = DUMMY_EVENTS.find((event) => event.id === eventId);
  if (!event) {
    throw new Error("event not found");
  }

  return (
    <>
      <h1>Event Details</h1>
      <h2>{event.title}</h2>
      <p>
        <strong>Event ID:</strong> {eventId}
      </p>
    </>
  );
}
