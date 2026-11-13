import { useEffect, useState } from "react";
import { API_BASE_URL, apiClient, type Product } from "../api/client";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      setErrorMessage(null);

      try {
        const { data, response } = await apiClient.GET("/products", {
          signal: controller.signal,
        });

        if (data === undefined) {
          console.error("Failed to load products", response.status);
          setErrorMessage(`The product service returned an error (HTTP ${response.status}).`);
          return;
        }

        setProducts(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to connect to the product service", error);
          setErrorMessage(
            `Unable to connect to the product service at ${API_BASE_URL}. Check that the API is running and accessible.`,
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => controller.abort();
  }, [reloadKey]);

  return {
    products,
    loading,
    errorMessage,
    retry: () => setReloadKey((key) => key + 1),
  };
}
