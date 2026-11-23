import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import { AuthError, registerUser } from "../api/auth";

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
        <main
            style={{
                alignItems: "center",
                backgroundColor: "#f5f7fb",
                display: "flex",
                justifyContent: "center",
                minHeight: "100vh",
                padding: "24px",
            }}
        >
            <section style={{ maxWidth: "360px", width: "100%" }}>
                <h1 style={{ marginBottom: "24px" }}>Create an account</h1>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <input
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                    />
                    <button type="submit" disabled={submitting}>
                        {submitting ? "Creating account..." : "Sign up"}
                    </button>
                    {errorMessage && <p role="alert">{errorMessage}</p>}
                </form>
                <p style={{ marginTop: "18px", textAlign: "center" }}>
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </section>
        </main>
    );
}
