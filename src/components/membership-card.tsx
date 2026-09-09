import { BrandMark } from "./brand-mark";
export function MembershipCard() {
  return (
    <div
      className="member-card-stage"
      aria-label="Gent membership card concept"
      role="img"
    >
      <div className="member-card">
        <div className="member-card-top">
          <span>GENT</span>
          <BrandMark />
        </div>
        <div className="member-card-bottom">
          <span>
            GOOD COMPANY.
            <br />
            SHARED TASTE.
          </span>
          <span>
            MEMBERSHIP
            <br />
            GENT RESERVE CO.
          </span>
        </div>
      </div>
      <div className="member-card-shadow" />
    </div>
  );
}
