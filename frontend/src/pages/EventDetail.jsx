import { useRouteLoaderData, redirect } from "react-router-dom";

import EventItem from "../components/EventItem.js";

import { BASE_URL as URL } from "../config.js";
import { getToken } from "../util/auth.js";

export async function loader({ request, params }) {
  // request - contains query parameters
  // params - contains path parameters

  try {
    const response = await fetch(URL + "/events/" + params.id);
    if (!response.ok) {
      throw new Error(`couldn't load data for the event (id: ${params.id})`);
    }

    return response;
  } catch (error) {
    return { error };
  }
}

export async function action({ request, params }) {
  console.log("EventDetail - action - deleting event item");
  try {
    // make an HTTP delete request to the backend
    const response = await fetch(URL + "/events/" + params.id, {
      method: request.method,
      headers: { Authorization: "Bearer " + getToken() },
    });
    if (!response.ok) {
      throw new Error("couldn't delete the event");
    }

    // success - redirect the user to events page
    return redirect("/events");
  } catch (error) {
    console.log("EventDetail - action - couldn't delete the event");
    console.log(error);
    return { error };
  }
}

export default function EventDetailPage() {
  const loadigData = useRouteLoaderData("event-detail");

  if (loadigData.error) {
    return (
      <>
        <h3>Sorry, something went wrong</h3>
        <p>
          Couldn't load data for this event. Please try refreshing the browser.
        </p>
      </>
    );
  }

  return <EventItem event={loadigData.event} />;
}
