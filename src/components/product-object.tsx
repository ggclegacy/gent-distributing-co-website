import Image from "next/image";
export function ProductObject({
  kind = "coffee",
  large = false,
  label,
}: {
  kind?: string;
  large?: boolean;
  label?: string;
}) {
  if (kind === "coffee") return <div className="detail-coffee-scene"><Image src="/images/cinema/vault.webp" alt="Legacy Reserve Signature Blend Coffee concept packaging on its stone archive pedestal" fill sizes="(max-width: 700px) 86vw, 45vw" /></div>;
  if (kind === "editorial") return <div className="editorial-object" role="img" aria-label="Gent collection editorial concept"><span>GENT</span><p>{label ?? "THE COLLECTION"}</p><small>ONE HOUSE. ONE STANDARD.</small></div>;
  return (
    <div
      className={`object-stage ${large ? "large" : ""}`}
      aria-label={`Concept packaging for Gent ${kind}`}
      role="img"
    >
      <div className={`product-object ${kind}`}>
        <div className="package-seal" />
        <div className="package-label">
          <span className="package-monogram">G</span>
          <span className="package-brand">GENT</span>
          <span className="package-small">DISTRIBUTION CO.</span>
          <div className="package-rule" />
          <span className="package-kind">
            {label ?? (kind === "bundles" ? "COLLECTION" : kind.toUpperCase())}
          </span>
          <span className="package-small">WORTH HAVING</span>
        </div>
        <span className="package-bottom">THE GENT STANDARD</span>
      </div>
      <div className="object-shadow" />
    </div>
  );
}
