import { redirect } from "react-router-dom";

import AuthForm from "../components/AuthForm.js";

import { setToken } from "../util/auth.js";
import { BASE_URL } from "../config.js";

export async function action({ request, params }) {
  console.log("AuthenticationPage - action - signing in/up user");

  try {
    // extract whether the submission was made in signin or signup page
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get("mode");

    if (mode !== "signin" && mode !== "signup") {
      throw new Response("invalid authentication mode", { status: 404 });
    }

    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");

    let url = BASE_URL + "/signup";
    if (mode === "signin") {
      url = BASE_URL + "/login";
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return response;
    }

    // success -> get the auth token and store it
    const resData = await response.json();
    const token = resData.token;
    setToken(token);

    console.log("AuthenticationPage - action - successfully signed in/up");
    return redirect("/");
  } catch (error) {
    if (error.status === 404) {
      throw error; // handled by errorElement
    }
    console.log("AuthenticationPage - action - signin/signup failed");
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "Sorry, something went wrong. Try again later.",
      }),
      { status: 500 }
    );
  }
}

export default function AuhenticationPage() {
  return <AuthForm />;
}
