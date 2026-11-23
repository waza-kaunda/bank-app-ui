import { Link } from "react-router";

export default function LandingPage() {
  return (
    <main className="welcome-page">
      <section className="logo-wrapper">
        <div className="brand-mark" aria-hidden="true">B</div>
        <h1 className="brand-wordmark">
          InsureTech<strong>Gaurd</strong>
        </h1>
      </section>
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
