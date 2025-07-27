import { useRouteError } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "Please try refreshing the browser";

  if (error.status === 404) {
    title = "404 Error";
    message = "Page or resource not found";
  }

  console.log(error);

  return (
    <>
      <MainNavigation />
      <h1>{title}</h1>
      <p>{message}</p>
    </>
  );
}
