// ============================ Deferring Data Fetching ============================
// * purpose - first load a fallback page and then render the correct page when the
//   data is completely loaded
// * use the `Await` component to render the `children` content when the Promise specified
//   as the `resolve` is resolved.
// * if the Promise gets rejected, the `errorElement` page will be rendered instead.
// * until the data is loaded, a fallback content can be shown using the `React.Suspense`
//   component by specifying its `fallback` prop.

/*
example code from the documentation 
```
import { Await, useLoaderData } from "react-router";

export function loader() {
// not awaited
const reviews = getReviews()
// awaited (blocks the transition)
const book = await fetch("/api/book").then((res) => res.json())
return { book, reviews }
}

function Book() {
const { book, reviews } = useLoaderData();
return (
<div>
  <h1>{book.title}</h1>
  <p>{book.description}</p>
  <React.Suspense fallback={<ReviewsSkeleton />}>
    <Await
      resolve={reviews}
      errorElement={
        <div>Could not load reviews 😬</div>
      }
      children={(resolvedReviews) => (
        <Reviews items={resolvedReviews} />
      )}
    />
  </React.Suspense>
</div>
);
}
```
*/

import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";

import EventsList from "../components/EventsList.js";

const URL = "http://localhost:8080";

async function getEvents() {
  const response = await fetch(URL + "/events");
  if (!response.ok) throw new Error("couldn't load events");

  const resData = await response.json();
  return resData.events; // success - return events array
}

export function loader() {
  // defer the async logic
  // before react-router-dom v7, use `defer` function
  return {
    events: getEvents(), // store a promise which will be resolved in the future
  };
}

export default function EventsPage() {
  // events is a Promise which will be either resolved or rejected in the future
  const { events } = useLoaderData();

  const loadingPage = (
    <>
      <h1>Loading Data</h1>
      <p>Please wait. We are loading the events.</p>
    </>
  );

  const errorPage = (
    <>
      <h1 className="error">Sorry, something went wrong</h1>
      <p className="error">
        Couldn't load the events. Please try refreshing the browser.
      </p>
    </>
  );

  return (
    <Suspense fallback={loadingPage}>
      <Await resolve={events} errorElement={errorPage}>
        {(resolvedEvents) => <EventsList events={resolvedEvents} />}
      </Await>
    </Suspense>
  );
}
