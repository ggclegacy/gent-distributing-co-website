export function ProductObject({
  kind = "coffee",
  large = false,
}: {
  kind?: string;
  large?: boolean;
}) {
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
            {kind === "bundles" ? "COLLECTION" : kind.toUpperCase()}
          </span>
          <span className="package-small">WORTH HAVING</span>
        </div>
        <span className="package-bottom">THE GENT STANDARD</span>
      </div>
      <div className="object-shadow" />
    </div>
  );
}
