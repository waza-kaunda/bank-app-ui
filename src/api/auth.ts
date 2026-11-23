/**
 * Token endpoint (see postman Auth/Token request): POST with HTTP Basic credentials,
 * responds with { loginAccessKey }. Defaults to a relative path proxied by Vite (vite.config.ts).
 * Override with VITE_AUTH_TOKEN_URL (see .env.example).
 */
const TOKEN_URL: string = import.meta.env.VITE_AUTH_TOKEN_URL ?? "/v1/token";

const TOKEN_STORAGE_KEY = "accessToken";

export class AuthError extends Error {}

const USER_URL: string = import.meta.env.VITE_AUTH_USER_URL ?? "/v1/user";

export function getAccessToken(): string | null {
  return sessionStorage.getItem(TOKEN_STORAGE_KEY);
}

export function logout(): void {
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
}

/** Creates a local user that can subsequently log in. */
export async function registerUser(username: string, password: string): Promise<void> {
  let response: Response;
  try {
    response = await fetch(USER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  } catch {
    throw new AuthError("Unable to reach the server. Please try again.");
  }

  if (response.status === 400) {
    throw new AuthError("An account with this username already exists.");
  }
  if (!response.ok) {
    throw new AuthError("Registration failed. Please try again.");
  }
}

/** Exchanges username/password for an access token and stores it for the session. */
export async function login(username: string, password: string): Promise<void> {
  // btoa only handles Latin-1; encode as UTF-8 first.
  const bytes = new TextEncoder().encode(`${username}:${password}`);
  const credentials = btoa(String.fromCharCode(...bytes));

  let response: Response;
  try {
    response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { Authorization: `Basic ${credentials}` },
    });
  } catch {
    throw new AuthError("Unable to reach the server. Please try again.");
  }

  if (response.status === 401 || response.status === 403) {
    throw new AuthError("Invalid username or password.");
  }
  if (!response.ok) {
    throw new AuthError("Login failed. Please try again.");
  }

  const body = (await response.json()) as { loginAccessKey?: string };
  if (!body.loginAccessKey) {
    throw new AuthError("Login failed. Please try again.");
  }
  sessionStorage.setItem(TOKEN_STORAGE_KEY, body.loginAccessKey);
}
