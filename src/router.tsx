import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import App from "./App";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
        { path: '/', element: <LandingPage /> },
        { path: '/login', element: <LoginPage /> },
        { path: '/home', element: <HomePage /> },
    ]
  }
])