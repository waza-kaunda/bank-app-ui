import Products from "../../components/Products/Products";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import MobileBottomDrawer from "../../components/MobileBottomDrawer/MobileBottomDrawer";
import { useProducts } from "../../hooks/useProducts";
import "./HomePage.css";

/** Container: wires the data hook to the presentational Products component. */
export default function HomePage() {
  const { products, loading, errorMessage, retry } = useProducts();

  return (
    <div className="home-page">
      <HomeHeader />
      <div className="home-page__content">
        <Products products={products} loading={loading} errorMessage={errorMessage} onRetry={retry} />
      </div>
      <MobileBottomDrawer />
    </div>
  );
}

