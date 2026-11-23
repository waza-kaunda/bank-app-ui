import { createBrowserRouter, redirect } from "react-router";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import App from "./App";
import { getAccessToken } from "./api/auth";

/** Route loader: sends unauthenticated users to the login page before the route renders. */
function requireAuth() {
  if (!getAccessToken()) {
    return redirect("/login");
  }
  return null;
}

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegistrationPage /> },
      { path: "/signup", element: <RegistrationPage /> },
      { path: "/home", loader: requireAuth, element: <HomePage /> },
    ],
  },
]);
