import logo from "../../assets/logo.svg";
import "./BrandIdentity.css";

interface BrandIdentityProps {
  className?: string;
  heading?: boolean;
  variant?: "default" | "header";
}

export default function BrandIdentity({
  className = "",
  heading = false,
  variant = "default",
}: BrandIdentityProps) {
  const isHeader = variant === "header";
  const Wordmark = isHeader ? "span" : heading ? "h1" : "p";
  const wrapperClassName = isHeader
    ? "brand-identity brand-identity--header"
    : `logo-wrapper brand-identity ${className}`.trim();

  return (
    <div className={wrapperClassName}>
      <span
        className={isHeader ? "brand-identity__mark--header" : "brand-mark"}
        aria-hidden="true"
      >
        {isHeader ? (
          <span className="brand-identity__header-icon" />
        ) : ( 
          <img src={logo} alt="" />
        )}
      </span>
      {!isHeader && (
        <Wordmark
          className={
            isHeader
              ? "brand-identity__wordmark--header"
              : "brand-wordmark"
          }
      >
        InsureTech<strong>Gaurd</strong>
      </Wordmark>
    )}
    </div>
  );
}
