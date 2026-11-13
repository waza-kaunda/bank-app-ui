import type { Product } from "../../api/client";
import { formatPrice } from "../../lib/format";
import placeholder from "../../assets/product-placeholder.jpeg";
import "./Products.css";

export interface ProductsProps {
  products: Product[];
  loading?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
}

export default function Products({
  products,
  loading = false,
  errorMessage = null,
  onRetry,
}: ProductsProps) {
  const showEmpty = !loading && !errorMessage && products.length === 0;

  return (
    <main className="page">

      <h2 className="ds-text-heading-2-bold">Discover</h2>
      {errorMessage && (
        <div className="banner banner--error" role="alert">
          <p>{errorMessage}</p>
          <button
            type="button"
            className="button button--full"
            onClick={onRetry}
          >
            Try again
          </button>
        </div>
      )}

      {showEmpty && (
        <div className="banner" role="status">
          <p>No products are available right now.</p>
        </div>
      )}

      {loading && (
        <div role="status">
          <span className="visually-hidden">Loading products...</span>
          <ImageCardSkeletons />
        </div>
      )}

      {!loading && (
          <ImageCards />
      )}

      {loading && (
        <div role="status">
          <span className="visually-hidden">Loading products...</span>
          <ProductSkeletons />
        </div>
      )}

      {!loading && products.length > 0 && (
        <>
          <ProductSection
            id="recommended"
            title="Recommended for you"
            products={products}
          />
          <ProductSection
            id="new-arrivals"
            title="New arrivals"
            products={products}
          />
        </>
      )}
    </main>
  );
}

function ProductSection({
  id,
  title,
  products,
}: {
  id: string;
  title: string;
  products: Product[];
}) {
  const headingId = `${id}-heading`;

  return (
    <section className="section" aria-labelledby={headingId}>
      <h2 id={headingId}>{title}</h2>
      {/* Focusable so keyboard users can scroll the rail on small screens */}
      <ul className="rail" role="list" tabIndex={0} aria-labelledby={headingId}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card">
      {/* Decorative: the product name is in the heading below */}
      <img
        className="card__image"
        src={product.imageUrl?.trim() || placeholder}
        alt="Product image thumbnail"
        loading="lazy"
        decoding="async"
        onError={(event) => {
          // Broken URL: swap to the placeholder once (guard avoids an error loop)
          if (!event.currentTarget.src.endsWith(placeholder)) {
            event.currentTarget.src = placeholder;
          }
        }}
      />
      <div className="card__body">
        <h3>{product.name}</h3>
        <p className="card__description">{product.description}</p>
        <p className="card__price">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}

function ProductSkeletons() {
  return (
    <ul className="rail" aria-hidden="true">
      {[0, 1, 2].map((key) => (
        <li key={key}>
          <div className="card skeleton">
            <div className="skeleton__block skeleton__image" />
            <div className="card__body">
              <div className="skeleton__block skeleton__line" />
              <div className="skeleton__block skeleton__line" />
              <div className="skeleton__block skeleton__line skeleton__line--short" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function ImageCardSkeletons() {
  return (
    <ul className="rail" role="list">
      {[0, 1, 2].map((key) => (
        <li key={key}>
          <div className="skeleton__block skeleton__image" />
        </li>
      ))}
    </ul>
  );
}

function ImageCard() {
  return (<article className="card">
      {/* Decorative: the product name is in the heading below */}
      <img
        className="card__image"
        src={placeholder}
        alt="Product image thumbnail"
        loading="lazy"
        decoding="async"
        onError={(event) => {
          // Broken URL: swap to the placeholder once (guard avoids an error loop)
          if (!event.currentTarget.src.endsWith(placeholder)) {
            event.currentTarget.src = placeholder;
          }
        }}
      />
    </article>);
}

function ImageCards() {
  return <ul className="rail" role="list">
      {[0, 1, 2].map((key) => (
        <li key={key}>
          <ImageCard />
        </li>
      ))}
    </ul>
}