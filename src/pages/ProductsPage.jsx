import { useNavigate, Link } from "react-router-dom";

const DUMMY_PRODUCTS = [
  { id: "p1", title: "product 1" },
  { id: "p2", title: "product 2" },
  { id: "p3", title: "product 3" },
  { id: "p4", title: "product 4" },
];

export default function ProductsPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Products</h1>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </>
  );
}
