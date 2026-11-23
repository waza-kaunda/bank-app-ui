import { Link } from "react-router";
import BrandIdentity from "../BrandIdentity/BrandIdentity";
import "./HomeHeader.css";

export default function HomeHeader() {
  return (
    <header className="home-header">
      <Link to="/home" className="home-header__brand" aria-label="InsureTech Guard home">
        <BrandIdentity variant="header" />
      </Link>
    </header>
  );
}
