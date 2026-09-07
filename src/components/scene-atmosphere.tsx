/** Decorative architectural layers: all story copy and controls remain real DOM. */
export function SceneAtmosphere({
  kind,
}: {
  kind: "chamber" | "display" | "network" | "vault" | "doorway";
}) {
  return (
    <div className={`scene-world world-${kind}`} aria-hidden="true">
      <div className="world-depth">
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} />
        ))}
      </div>
      <div className="world-floor" />
      <div className="world-beam" />
      <div className="world-haze" />
      {kind === "doorway" && (
        <>
          <div className="door-left" />
          <div className="door-right" />
        </>
      )}
    </div>
  );
}
