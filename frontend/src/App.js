import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root.jsx";
import ErrorPage from "./pages/Error.jsx";
import HomePage from "./pages/Home.jsx";
import EventsPage, { loader as eventsLoader } from "./pages/Events.jsx";
import EventsLayout from "./pages/EventsLayout.jsx";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as eventDeleteAction,
} from "./pages/EventDetail.jsx";
import NewEventPage from "./pages/NewEvent.jsx";
import EditEventPage from "./pages/EditEvent.jsx";

import { action as newOrEditEventAction } from "./components/EventForm.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsPage />,
        loader: eventsLoader,
      },
      {
        path: "events",
        element: <EventsLayout />,
        children: [
          {
            id: "event-detail",
            path: ":id",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: eventDeleteAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: newOrEditEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: newOrEditEventAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
