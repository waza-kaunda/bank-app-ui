import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import SplashScreen from "./pages/LandingPage/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setShowSplash(false), 2000);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return showSplash ? <SplashScreen /> : <Outlet />;
}

export default App;
