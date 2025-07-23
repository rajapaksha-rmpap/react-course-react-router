import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { createRoutesFromElements, Route } from "react-router-dom";

import RootPage from "./pages/RootPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";

// step 1 - create a router with a route definiton object array
// a route definition is simply a path to component (element) mapping
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      // { path: "/", element: <HomePage /> },
      { index: true, element: <HomePage /> }, // index route
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:id", element: <ProductPage /> },
    ],
  },
]);

// ===================================================================
// // ******* an alternative way of defining route definitions *******
// const routes = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<ProductsPage />} />
//   </Route>
// );

// const routerFromRoutes = createBrowserRouter(routes);

// ===================================================================

// step 2 - provide the router to App
function App() {
  return <RouterProvider router={router} />;
}

export default App;
