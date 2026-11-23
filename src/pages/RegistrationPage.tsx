import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import { AuthError, registerUser } from "../api/auth";
import logo from "../assets/logo.svg";

export default function RegistrationPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage(null);

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        setSubmitting(true);
        try {
            await registerUser(username, password);
            navigate("/login", { replace: true });
        } catch (error) {
            setErrorMessage(error instanceof AuthError ? error.message : "Registration failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="welcome-page auth-page">
            <section className="welcome-content auth-content">
                <div className="logo-wrapper">
                    <div className="brand-mark" aria-hidden="true"><img src={logo} alt="" /></div>
                    <p className="brand-wordmark">
                        InsureTech<strong>Gaurd</strong>
                    </p>
                </div>
                <h1 className="auth-heading">Create an account</h1>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <label className="form-input">
                        <input
                            className="form-control"
                            type="email"
                            autoComplete="Email"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                        <span className="form-input-label">Email</span>
                    </label>
                    <label className="form-input">
                        <input
                            className="form-control"
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <span className="form-input-label">Password</span>
                    </label>
                    <label className="form-input">
                        <input
                            className="form-control"
                            type="password"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            required
                        />
                        <span className="form-input-label">Confirm password</span>
                    </label>
                    <button className="primary-action" type="submit" disabled={submitting}>
                        {submitting ? "Creating account..." : "Sign up"}
                    </button>
                    {errorMessage && (
                        <p className="auth-error" role="alert">
                            {errorMessage}
                        </p>
                    )}
                </form>
                <p className="auth-footer">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </section>
        </main>
    );
}
