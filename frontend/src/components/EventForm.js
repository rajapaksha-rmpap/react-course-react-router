import {
  useNavigate,
  useNavigation,
  useActionData,
  Form,
  redirect,
} from "react-router-dom";

import { BASE_URL } from "../config.js";

import classes from "./EventForm.module.css";

export async function action({ request, params }) {
  console.log("NewEvent - action - I'm here");

  try {
    // obtain the form data
    const data = await request.formData();
    const title = data.get("title").trim();
    const image = data.get("image");
    const date = data.get("date");
    const description = data.get("description").trim();

    // validate the form data
    const errors = {};
    if (title.length === 0) {
      errors.title = "title cannot be empty";
    }

    if (description.length === 0) {
      errors.description = "description cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
      return { errors };
    }

    // send an http POST request to backend
    let url = BASE_URL + "/events";
    if (request.method === "PATCH") url += "/" + params.id;
    const response = await fetch(url, {
      method: request.method,
      body: JSON.stringify({ title, image, date, description }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 422) {
      return response;
    }

    if (!response.ok) {
      throw new Error("couldn't submit the new event");
    }

    // success - redirect to the events page
    console.log("NewEvent - action - successfully submitted the new event");
    return redirect("/events");
  } catch (error) {
    console.log("NewEvent - action - couldn't submit the new event");
    console.log(error);
    return { failed: true };
  }
}

export default function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <>
      {data?.failed && (
        <div className={classes.errorHeader}>
          Oops, something went wrong. Please try again.
        </div>
      )}
      <Form method={method} className={classes.form}>
        <p>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            required
            defaultValue={event?.title}
          />
          {data?.errors?.title && (
            <span className={classes.error}>{data.errors.title}</span>
          )}
        </p>
        <p>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="url"
            name="image"
            required
            defaultValue={event?.image}
          />
          {data?.errors?.image && (
            <span className={classes.error}>{data.errors.image}</span>
          )}
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            required
            defaultValue={event?.date}
          />
          {data?.errors?.date && (
            <span className={classes.error}>{data.errors.date}</span>
          )}
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            defaultValue={event?.description}
          />
          {data?.errors?.description && (
            <span className={classes.error}>{data.errors.description}</span>
          )}
        </p>
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}
