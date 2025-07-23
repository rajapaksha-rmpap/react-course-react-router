/*
* the Link Component does the following things: 
* 1. renders a typical HTML anchor `<a>` component
* 2. prevents the default behavior of sending an HTTP GET request to tha backend, 
  which will reload the React application from the backend and reset the state values
* 3. will render the correct element and change the URL 
*/

import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <p>
        Visit <Link to="/products">the products page</Link> to view the list of
        all products.
      </p>
    </>
  );
}
