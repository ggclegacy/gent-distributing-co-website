"use client";
import Link from "next/link";
import { useState } from "react";
export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link
        href="/"
        className="wordmark"
        aria-label="Gent Distribution Co. home"
      >
        GENT<span>DISTRIBUTION CO.</span>
      </Link>
      <nav
        id="mobile-menu"
        aria-label="Main navigation"
        className={open ? "nav open" : "nav"}
      >
        <Link onClick={() => setOpen(false)} href="/#collection">
          The collection
        </Link>
        <Link onClick={() => setOpen(false)} href="/#philosophy">
          Our standard
        </Link>
        <Link onClick={() => setOpen(false)} href="/membership">
          Gent membership <span>↗</span>
        </Link>
      </nav>
      <span className="header-note">A WORLD OF GOOD TASTE</span>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"} <span>{open ? "−" : "+"}</span>
      </button>
    </header>
  );
}
