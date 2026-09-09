import type { Metadata } from "next";

export const brand = {
  name: "Gent Reserve Co.",
  title: "Gent Reserve Co. — Rooted here. Built to move further.",
  description: "Gent Reserve Co. discovers, develops, curates and distributes exceptional goods. A premium commerce and brand platform, rooted in Louisiana with a wider reach.",
};

/** Shared page and social identity; product names remain independent of the company. */
export function pageMetadata(title: string, description: string): Metadata {
  const socialTitle = `${title} | ${brand.name}`;
  return {
    title,
    description,
    openGraph: { title: socialTitle, description, siteName: brand.name, type: "website" },
    twitter: { card: "summary", title: socialTitle, description },
  };
}
