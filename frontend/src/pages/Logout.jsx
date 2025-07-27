// no page component for logout

import { redirect } from "react-router-dom";
import { removeToken } from "../util/auth";

export function action() {
  // delete the auth token from the local storage
  console.log("Logout - action - logging out the user");
  removeToken();
  return redirect("/"); // redirect to home page
}
