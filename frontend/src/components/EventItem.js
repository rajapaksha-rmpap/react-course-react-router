import {
  useRouteLoaderData,
  useActionData,
  useSubmit,
  Link,
} from "react-router-dom";

import classes from "./EventItem.module.css";

function EventItem({ event }) {
  const { isUserAuthenticated } = useRouteLoaderData("root");
  const data = useActionData();
  const submit = useSubmit();

  function handleDelete() {
    const confirm = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirm) return;

    // activate the action function
    submit(
      {
        message:
          "this would be automatically converted to FormData which can be accessed using request.formData() inside the action function",
      },
      {
        method: "DELETE",
      }
    );
  }

  return (
    <article className={classes.event}>
      {data?.error && (
        <div className={classes.errorHeader}>
          Sorry, something went wrong. We couldn't delete the item.
        </div>
      )}
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      {isUserAuthenticated && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </menu>
      )}
      {!isUserAuthenticated && (
        <p style={{ marginTop: "20px" }}>
          <strong>Log in first to add and edit events</strong>
        </p>
      )}
    </article>
  );
}

export default EventItem;
