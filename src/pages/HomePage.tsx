import Products from "../components/Products/Products";
import { useProducts } from "../hooks/useProducts";

/** Container: wires the data hook to the presentational Products component. */
export default function HomePage() {
  const { products, loading, errorMessage, retry } = useProducts();

  return <Products products={products} loading={loading} errorMessage={errorMessage} onRetry={retry} />;
}
