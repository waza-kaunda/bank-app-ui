import { Link } from "react-router";
import "./HomeHeader.css";

export default function HomeHeader() {
  return (
    <header className="home-header">
      <Link to="/home" className="home-header__brand" aria-label="InsureTech Guard home">
        <span className="home-header__logo">
          <span className="home-header__logo-icon" aria-hidden="true" />
        </span>
      </Link>
    </header>
  );
}
