import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList.js";

const URL = "http://localhost:8080";

export async function loader() {
  try {
    const response = await fetch(URL + "/events");
    if (!response.ok) throw new Error("couldn't load events");

    return response; // :Response
  } catch (error) {
    console.log(error.message);
    return { error };
  }
}

export default function EventsPage() {
  const data = useLoaderData();

  if (data.hasError) {
    return (
      <>
        <h3>Sorry, something went wrong</h3>
        <p>Couldn't load events. Please try refreshing the browser.</p>
      </>
    );
  }

  return <EventsList events={data.events} />;
}
