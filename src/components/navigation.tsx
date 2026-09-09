"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { BrandMark } from "./brand-mark";
export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <Link
        href="/"
        className="brand"
        aria-label="Gent Reserve Co. home"
        onClick={() => setOpen(false)}
      >
        <BrandMark />
        <span className="wordmark">
          GENT <span>RESERVE CO.</span>
        </span>
      </Link>
      <nav
        id="main-navigation"
        className={open ? "nav open" : "nav"}
        aria-label="Main navigation"
      >
        <Link href="/#collection" onClick={() => setOpen(false)}>
          Collection
        </Link>
        <Link href="/#philosophy" onClick={() => setOpen(false)}>
          Our standard
        </Link>
        <Link href="/#ecosystem" onClick={() => setOpen(false)}>
          For partners
        </Link>
        <Link
          className="nav-membership"
          href="/membership"
          onClick={() => setOpen(false)}
        >
          Gent membership <span aria-hidden="true">↗</span>
        </Link>
      </nav>
      <button
        ref={toggle}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}{" "}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
    </header>
  );
}
