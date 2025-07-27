/* ===================== Using Query Parameters to switch between two states =====================
 * - to get access to the query parameters in the currently active path, use the `useSearchParams` hook
 *   syntax: `const [searchParams, setSearchParams] = useSearchParams(); const mode = searchParams.get("mode");`
 * - to apply query parameters to a path, simply use the `to` prop of the `Link` or `NavLink` component,
 *   as in `<Link to="?mode=signin">...</Link>`
 */

import {
  useActionData,
  useSearchParams,
  useNavigation,
  Form,
  Link,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

export default function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  if (mode !== "signin" && mode !== "signup") {
    throw new Response("invalid authentication mode", { status: 404 });
  }

  const isSignin = mode === "signin";
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        {data && (
          <div className={classes.errorHeader}>
            {data.message || "Sorry, something went wrong. Try again later."}
          </div>
        )}
        <h1>{isSignin ? "Sign In" : "Sign Up"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
          {data?.errors?.email && (
            <span className={classes.error}>{data.errors.email}</span>
          )}
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
          {data?.errors?.password && (
            <span className={classes.error}>{data.errors.password}</span>
          )}
        </p>
        {!isSignin && (
          <p>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              name="confirm-password"
              required
            />
            {data?.errors?.confirmPassword && (
              <span className={classes.error}>
                {data.errors.confirmPassword}
              </span>
            )}
          </p>
        )}
        <div className={classes.actions}>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : isSignin ? "Sign in" : "Sign up"}
          </button>
        </div>
        {isSignin && (
          <p className={classes.para}>
            Don't have an account? If so, please{" "}
            <Link to="?mode=signup">sign up</Link> instead.
          </p>
        )}
        {!isSignin && (
          <p className={classes.para}>
            Already have an account? Then please{" "}
            <Link to="?mode=signin">sign in</Link>.
          </p>
        )}
      </Form>
    </>
  );
}
