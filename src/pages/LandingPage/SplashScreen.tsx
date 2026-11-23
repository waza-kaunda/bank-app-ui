import BrandIdentity from "../../components/BrandIdentity/BrandIdentity";

export default function SplashScreen() {
  return (
    <main className="splash-screen" role="status" aria-label="Loading InsureTech Gaurd">
      <BrandIdentity heading className="splash-brand" />
    </main>
  );
}
