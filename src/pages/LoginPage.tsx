import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { AuthError, login } from "../api/auth";

export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage(null);
        setSubmitting(true);
        try {
            await login(username, password);
            navigate("/home", { replace: true });
        } catch (error) {
            setErrorMessage(error instanceof AuthError ? error.message : "Login failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={submitting}>
                    {submitting ? "Logging in..." : "Login"}
                </button>
                {errorMessage && <p role="alert">{errorMessage}</p>}
            </form>
        </div>
    );
}
