import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root.jsx";
import ErrorPage from "./pages/Error.jsx";
import HomePage from "./pages/Home.jsx";
import EventsPage from "./pages/Events.jsx";
import EventsLayout from "./pages/EventsLayout.jsx";
import EventDetailPage from "./pages/EventDetail.jsx";
import NewEventPage from "./pages/NewEvent.jsx";
import EditEventPage from "./pages/EditEvent.jsx";

export const DUMMY_EVENTS = [
  { id: "e1", title: "Event 1 - Birthday Party" },
  { id: "e2", title: "Event 2 - Convocation" },
  { id: "e3", title: "Event 3 - Final Presentation" },
  { id: "e4", title: "Event 4 - Annual Trip" },
];

const router = createBrowserRouter([
  // add a root route
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "events", element: <EventsPage /> },
      {
        path: "events",
        element: <EventsLayout />,
        children: [
          { path: ":id", element: <EventDetailPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":id/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
