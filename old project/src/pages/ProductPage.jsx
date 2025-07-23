import { useParams } from "react-router-dom";

export default function ProductPage() {
  const params = useParams();

  // fetch data of the product from the backend here

  return (
    <>
      <h1>Product Details</h1>
      <p>product id: {params.id}</p>
    </>
  );
}
