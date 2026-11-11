import createClient from "openapi-fetch";
import type { components, paths } from "./generated/client";

/**
 * Base URL of the DevCamp Client Service (BFF).
 * Defaults to a relative path, which the Vite dev server proxies to the backend (see vite.config.ts).
 * Override with VITE_API_BASE_URL (see .env.example).
 */
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "/client/v1";

/** Single shared, fully typed client for the Client Service spec (generated/client.ts). */
export const apiClient = createClient<paths>({ baseUrl: API_BASE_URL });

export type Product = components["schemas"]["ProductDto"];
