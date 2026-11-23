import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import { AuthError, login } from "../api/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);
    try {
      await login(username, password);
      navigate("/home", { replace: true });
    } catch (error) {
      setErrorMessage(
        error instanceof AuthError
          ? error.message
          : "Login failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="welcome-page auth-page">
      <section className="welcome-content auth-content login-content">
        <div className="logo-wrapper">
          <div className="brand-mark" aria-hidden="true">B</div>
          <p className="brand-wordmark">
            InsureTech<strong>Gaurd</strong>
          </p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="form-input">
            <input
              className="form-control"
              type="email"
              autoComplete="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span className="form-input-label">Email</span>
          </label>
          <label className="form-input">
            <input
              className="form-control"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="form-input-label">Password</span>
          </label>
          <button className="primary-action" type="submit" disabled={submitting}>
            {submitting ? "Logging in..." : "Login"}
          </button>
          {errorMessage && (
            <p className="auth-error" role="alert">
              {errorMessage}
            </p>
          )}
        </form>
        <p className="forgot-password">
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </section>
    </main>
  );
}
