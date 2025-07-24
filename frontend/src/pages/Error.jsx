import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <h1>404 Error</h1>
      <p>Page not found</p>
      <button>
        <Link to="/">Back to Home</Link>
      </button>
    </>
  );
}
