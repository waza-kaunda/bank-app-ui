import { Link } from "react-router";
import "./MobileBottomDrawer.css";

export default function MobileBottomDrawer() {
  return (
    <nav className="mobile-bottom-drawer" aria-label="Quick actions">
      <Link className="mobile-bottom-drawer__action" to="/home" aria-current="page">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
        </svg>
        <span>Home</span>
      </Link>
      <a className="mobile-bottom-drawer__action" href="#recommended">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m16 16 4 4" />
        </svg>
        <span>Discover</span>
      </a>
      <a className="mobile-bottom-drawer__action" href="#new-arrivals">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" />
        </svg>
        <span>New</span>
      </a>
      <Link className="mobile-bottom-drawer__action" to="/login">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
        <span>Account</span>
      </Link>
    </nav>
  );
}
