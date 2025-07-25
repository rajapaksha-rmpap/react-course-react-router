import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";

export async function action({ request, params }) {
  console.log("NewsletterSignup - action - signing up for newsletter");

  const data = await request.formData();
  const email = data.get("email");
  console.log(`email: ${email}`);

  // verify the email form input
  // make an HTTP POST request to the backend

  return {
    status: "success",
    message: "You successfully signed up to our newsletter.",
  };
}

export default function NewsletterSignup() {
  const form = useRef();
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.status === "success") {
      // reset the form in submission is successful
      console.log(
        "NewsletterSignup - useEffect - submission is successful; reset the form"
      );
      form.current.reset();
      window.alert(fetcher.data.message);
    }
  }, [fetcher.data]);

  return (
    <fetcher.Form
      ref={form}
      method="POST"
      action="/newsletter" // do not cause a navigation to /newsletter path
      className={classes.newsletter}
    >
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
        required
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}
