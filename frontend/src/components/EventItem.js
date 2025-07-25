import { Link, useSubmit } from "react-router-dom";

import classes from "./EventItem.module.css";

function EventItem({ event }) {
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
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
