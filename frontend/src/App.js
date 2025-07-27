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
import NewsletterPage from "./pages/Newsletter.jsx";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication.jsx";

import { action as newOrEditEventAction } from "./components/EventForm.js";
import { action as newsletterSignupAction } from "./components/NewsletterSignup.jsx";
import { action as logoutAction } from "./pages/Logout.jsx";
import { authLoader } from "./util/auth.js";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: authLoader,
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
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterSignupAction,
      },
      { path: "auth", element: <AuthenticationPage />, action: authAction },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
