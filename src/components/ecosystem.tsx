import Image from "next/image";
export function Ecosystem() {
  return <figure className="partner-architecture">
    <Image src="/images/cinema/distribution-center.webp" alt="Automated material handling and connected distribution in the Gent innovation campus" fill sizes="(max-width: 700px) 86vw, 45vw" />
    <figcaption><span>MAKER → GENT → BUSINESS → CUSTOMER</span><strong>Origin travels with it.</strong></figcaption>
  </figure>;
}
