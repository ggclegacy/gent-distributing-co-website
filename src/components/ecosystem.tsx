import Image from "next/image";
export function Ecosystem() {
  return <figure className="partner-architecture">
    <Image src="/images/cinema/network.webp" alt="Dark steel shelving and walnut cases in the Gent distribution house" fill sizes="(max-width: 700px) 86vw, 45vw" />
    <figcaption><span>MAKER → GENT → BUSINESS → CUSTOMER</span><strong>Origin travels with it.</strong></figcaption>
  </figure>;
}
