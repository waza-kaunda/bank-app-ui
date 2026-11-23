import Products from "../components/Products/Products";
import { useProducts } from "../hooks/useProducts";

/** Container: wires the data hook to the presentational Products component. */
export default function HomePage() {
  const { products, loading, errorMessage, retry } = useProducts();

  return (
    <>
      <style>{`
        .home-page {
          display: flex;
          background-color: var(--color-surface);
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
      `}</style>
      <div className="home-page">
        <Products products={products} loading={loading} errorMessage={errorMessage} onRetry={retry} />
      </div>
    </>
  );
}

