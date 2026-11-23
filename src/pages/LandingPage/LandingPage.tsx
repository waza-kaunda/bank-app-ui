import { Link } from "react-router";
import BrandIdentity from "../../components/BrandIdentity/BrandIdentity";

export default function LandingPage() {
  return (
    <main className="welcome-page">
      <BrandIdentity heading />
      <section className="welcome-content">
        <Link to="/login" className="primary-action">
          Log in
        </Link>
        <p className="welcome-prompt">
          Don't have an account?{" "}
          <Link to="/register" className="welcome-link">
            Sign up
          </Link>
        </p>
        <Link to="/home" className="welcome-secondary-link">
          Continue as guest
        </Link>
      </section>
    </main>
  );
}
