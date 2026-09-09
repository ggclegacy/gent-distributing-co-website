"use client";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { enterMobilePresentation } from "./mobile-presentation";
import { beats, beatAt, exchangeSignal, smooth, storyAt } from "@/lib/exchange-film";
import {
  IntroDirector,
  type IntroMode,
  type IntroState,
} from "@/lib/intro-director";
import { ProductStory } from "./product-story";
import type { ExchangeWorldProps, HudPoint } from "./exchange-world";

class RenderBoundary extends Component<
  { children: ReactNode; onFail: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
/** Semantic entrance and local poster render on the server, before the optional 3D chunk. */
export function ExchangeHero() {
  const root = useRef<HTMLElement>(null),
    director = useRef<IntroDirector | null>(null),
    skipButton = useRef<HTMLButtonElement>(null),
    exploreLink = useRef<HTMLAnchorElement>(null);
  const presentation = useRef<(() => void) | undefined>(undefined);
  const [paused, setPaused] = useState(false);
  const [state, setState] = useState<IntroState>("DORMANT");
  const [loadRequest, setLoadRequest] = useState(0);
  const [World, setWorld] =
    useState<React.ComponentType<ExchangeWorldProps> | null>(null);
  const [mode, setMode] = useState<IntroMode>("full");
  const [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false);
  useEffect(() => {
    const element = root.current!;
    const instance = new IntroDirector((next) => {
      if (next === "EXPLORE") {
        const wasImmersive = Boolean(presentation.current);
        presentation.current?.();
        presentation.current = undefined;
        if (wasImmersive) requestAnimationFrame(() => exploreLink.current?.focus({ preventScroll: true }));
      }
      setState(next);
      if (next === "PLAYING" || next === "EXPLORE") setPaused(false);
      setMode(instance.mode);
      const cinema = element.closest<HTMLElement>("[data-cinema]");
      if (cinema) cinema.dataset.introState = next;
      window.dispatchEvent(
        new CustomEvent("gent-intro-state", { detail: next }),
      );
      if (next === "EXPLORE" && document.activeElement === skipButton.current)
        requestAnimationFrame(() => {
          if (element.isConnected)
            exploreLink.current?.focus({ preventScroll: true });
        });
    });
    director.current = instance;
    instance.restore();
    const seek = (event: Event) => {
      if (process.env.NODE_ENV === "development") instance.preview(Number((event as CustomEvent).detail));
    };
    if (process.env.NODE_ENV === "development") window.addEventListener("gent-film-seek", seek);
    if (
      location.hash &&
      location.hash !== "#arrival" &&
      location.hash !== "#origins"
    )
      instance.skip();
    const escape = (e: KeyboardEvent) => {
      if (
        e.key === "Escape" &&
        ["PREPARING", "PLAYING", "RESOLVING"].includes(instance.state)
      )
        instance.skip();
    };
    // Establish an in-page destination before handing authority to PageDirector.
    // This avoids Next Link scrolling to an absolute scene before its timeline exists.
    const navigate = (e: MouseEvent) => {
      const target =
        e.target instanceof Element
          ? e.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (
        !target ||
        e.defaultPrevented ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      )
        return;
      if (instance.state !== "EXPLORE") {
        const url = new URL(target.href);
        if (
          url.origin === location.origin &&
          url.pathname === location.pathname &&
          url.hash
        ) {
          let destination: HTMLElement | null = null;
          try {
            destination = document.getElementById(
              decodeURIComponent(url.hash.slice(1)),
            );
          } catch {}
          if (destination) {
            e.preventDefault();
            history.pushState(null, "", url.hash);
            instance.skip();
            // Native/reduced layouts align here; enhanced layouts reconcile the
            // same hash after their own font/ScrollTrigger refresh below the hero.
            requestAnimationFrame(() => {
              if (
                element.isConnected &&
                !element.closest("[data-cinema-ready]")
              )
                destination?.scrollIntoView({
                  behavior: "instant",
                  block: "start",
                });
            });
            window.dispatchEvent(new Event("hashchange"));
            return;
          }
        }
      }
      instance.skip();
    };
    let inView = true;
    const visibility = () => {
      instance.setVisibility(document.hidden);
      element.dataset.ambient = document.hidden || !inView ? "paused" : "playing";
    };
    const viewport = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; visibility(); });
    viewport.observe(element);
    document.addEventListener("visibilitychange", visibility);
    const hash = () => {
      if (location.hash) instance.skip();
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("click", navigate, true);
    window.addEventListener("hashchange", hash);
    return () => {
      window.removeEventListener("gent-film-seek", seek);
      viewport.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      presentation.current?.();
      presentation.current = undefined;
      instance.dispose();
      director.current = null;
      document.removeEventListener("keydown", escape);
      document.removeEventListener("click", navigate, true);
      window.removeEventListener("hashchange", hash);
    };
  }, []);
  useEffect(() => {
    let disposed = false;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: EventTarget & { saveData?: boolean };
    };
    const sync = () => {
      const next: IntroMode =
        media.matches || document.documentElement.dataset.motion === "paused"
          ? "reduced"
          : failed || nav.connection?.saveData || (nav.deviceMemory ?? 8) <= 2
            ? "fallback"
            : "full";
      setMode(next);
      if (next !== "full") setReady(false);
      director.current?.setMode(next);
      if (
        next === "full" &&
        (director.current?.state !== "EXPLORE" || loadRequest > 0)
      )
        void import("./exchange-world")
          .then((m) => {
            if (
              !disposed &&
              (director.current?.state !== "EXPLORE" || loadRequest > 0)
            )
              setWorld(() => m.ExchangeWorld);
          })
          .catch(() => {
            if (!disposed) setFailed(true);
          });
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    media.addEventListener("change", sync);
    nav.connection?.addEventListener?.("change", sync);
    sync();
    return () => {
      disposed = true;
      observer.disconnect();
      media.removeEventListener("change", sync);
      nav.connection?.removeEventListener?.("change", sync);
    };
  }, [failed, loadRequest]);
  useEffect(() => {
    const element = root.current!;
    const chapter = element.querySelector<HTMLElement>("[data-chapter]")!;
    const caption = element.querySelector<HTMLElement>("[data-caption]")!;
    const update = () => {
      const p = exchangeSignal.progress,
        b = beatAt(p);
      element.dataset.progress = p.toFixed(4);
      element.dataset.beat = beats[b][0].toLowerCase();
      const frame = storyAt(p);
      Object.entries(frame).forEach(([key,value]) => element.style.setProperty(`--story-${key}`,String(value)));
      element.style.setProperty("--handoff", "0");
      element.style.setProperty("--resolution", String(frame.brand));
      element.style.setProperty("--film-copy", String(1-smooth(.87,.91,p)));
      element.style.setProperty("--categories", "0");
      element.style.setProperty("--finale", String(frame.brand));
      element.querySelectorAll<HTMLElement>("[data-story-step]").forEach((step,i) => {
        step.dataset.active = String(i === b);
        step.dataset.complete = String(i < b);
      });
      chapter.textContent = `0${b + 1} / ${beats[b][0]}`;
      caption.textContent = beats[b][1];
    };
    exchangeSignal.listeners.add(update);
    update();
    return () => {
      exchangeSignal.listeners.delete(update);
    };
  }, []);
  const fail = useCallback(() => {
    setFailed(true);
    setReady(false);
    director.current?.setMode("fallback");
  }, []);
  const worldReady = useCallback(() => {
    setReady(true);
    director.current?.setReady();
    if (process.env.NODE_ENV === "development") {
      const frame = new URLSearchParams(location.search).get("network-frame");
      if (frame !== null && Number.isFinite(Number(frame)))
        director.current?.preview(Number(frame));
    }
  }, []);
  const project = useCallback((points: HudPoint[]) => {
    for (const p of points) {
      const label = root.current?.querySelector<HTMLElement>(
        `[data-hud="${p.id}"]`,
      );
      if (label) {
        label.style.transform = `translate3d(${p.x}px,${p.y}px,0)`;
        label.style.opacity = p.visible ? "1" : "0";
      }
    }
  }, []);
  const live = mode === "full" && !failed && Boolean(World);
  const running = ["PREPARING", "PLAYING", "RESOLVING"].includes(state);
  const completed = state === "EXPLORE";
  return (
    <section
      ref={root}
      id="arrival"
      className="network-entrance exchange-film"
      data-state={state}
      data-mode={mode}
      data-paused={paused}
      data-renderer={live && ready ? "webgl" : "poster"}
      data-progress="0.0000"
      aria-labelledby="hero-title"
    >
      <div className="exchange-poster" aria-hidden="true">
        <Image
          unoptimized
          src="/images/exchange/network-dormant.webp"
          alt=""
          fill
          sizes="100vw"
          priority
        />
        <Image
          unoptimized
          className="exchange-poster-portrait"
          src="/images/exchange/network-dormant-portrait.webp"
          alt=""
          fill
          sizes="100vw"
          priority
        />
      </div>
      {live && World && (
        <RenderBoundary onFail={fail}>
          <World onFail={fail} onReady={worldReady} onProject={project} />
        </RenderBoundary>
      )}
      <div className="network-completed-poster" aria-hidden="true">
        <Image
          unoptimized
          src="/images/exchange/network-complete.webp"
          alt=""
          fill
          sizes="100vw"
        />
        <Image
          unoptimized
          className="exchange-poster-portrait"
          src="/images/exchange/network-complete-portrait.webp"
          alt=""
          fill
          sizes="100vw"
        />
      </div>
      <div className="network-arrival-room" aria-hidden="true">
        <Image
          src="/images/story/product-intelligence-lab-landscape.webp"
          alt=""
          fill
          sizes="100vw"
        />
        <Image
          className="exchange-poster-portrait"
          src="/images/story/product-intelligence-lab-portrait.webp"
          alt=""
          fill
          sizes="100vw"
        />
      </div>
      <ProductStory />
      <div className="network-vignette" aria-hidden="true" />
      <div className="network-edition" aria-hidden="true">
        <span>GENT RESERVE CO.</span>
        <span>30.2241° N / 92.0198° W</span>
      </div>
      <div className="network-intro-copy" aria-hidden={running || completed}>
        <p className="network-eyebrow" id="origins">
          LOUISIANA / THE POINT OF ORIGIN
        </p>
        <h1 id="hero-title">
          Born in Louisiana.
          <br />
          <em>Built for national reach.</em>
        </h1>
        <p className="network-invitation" id="network-invitation">Enter the Reserve. See how exceptional goods move from origin to opportunity.</p>
        <button
          aria-describedby="network-invitation"
          className="network-activate"
          disabled={running || completed}
          onClick={() => {
            presentation.current ??= enterMobilePresentation(root.current!, () => director.current?.skip());
            director.current?.activate();
            skipButton.current?.focus({ preventScroll: true });
          }}
        >
          <span className="network-play" aria-hidden="true">▷</span>
          <span className="network-activate-label"><span className="desktop-entry-label">ACTIVATE THE NETWORK</span><span className="mobile-entry-label">ENTER THE EXPERIENCE</span></span>
          <span className="network-activate-arrow" aria-hidden="true">→</span>
        </button>
        <noscript>
          <a className="network-static-explore" href="#philosophy">
            EXPLORE GENT →
          </a>
        </noscript>
      </div>
      <div className="network-caption" aria-hidden={!running}>
        <span data-chapter>01 / ORIGIN</span>
        <strong data-caption>Lafayette, Louisiana.</strong>
      </div>
      <div className="network-hud" aria-hidden="true">
        <div data-hud="origin">
          <small>ORIGIN / LAFAYETTE</small>
          <b>GENT · ACTIVE</b>
        </div>
        <div data-hud="destination">
          <small>ROUTE → DESTINATION</small>
          <b>REACH / POSSIBILITY</b>
        </div>
      </div>
      <div className="network-categories" aria-hidden="true">
        <span>PROVISIONS</span>
        <span>GROOMING</span>
        <span>WELLNESS</span>
        <span>HOME</span>
        <span>SPECIALTY</span>
      </div>
      <div
        className="network-resolution"
        aria-hidden={!completed && state !== "RESOLVING"}
      >
        <p className="network-eyebrow">GENT RESERVE CO.</p>
        <h2>
          LOUISIANA BORN.
          <br />
          <em>BUILT TO MOVE FURTHER.</em>
        </h2>
        
      </div>
      <div className="network-finale" aria-hidden="true">
        <div className="network-orbit" /><div className="network-orbit network-orbit-inner" />
        <span className="network-final-label">SOURCE · SELECT · MOVE · DELIVER</span>
        <i /><i /><i /><i /><i />
      </div>
      <div className="network-bottom">
        <button className="network-pause" hidden={!running || state === "PREPARING" || mode !== "full"} aria-pressed={paused} onClick={() => {
          const next = !paused;
          setPaused(next);
          director.current?.setPaused(next);
          root.current?.setAttribute("data-paused", String(next));
        }}>{paused ? "RESUME FILM ▷" : "PAUSE FILM Ⅱ"}</button>
        <span className="network-origin-note">
          LOUISIANA-BORN. <i>NATIONAL AMBITION.</i>
        </span>
        <button
          ref={skipButton}
          className="network-skip"
          onClick={() => {
            director.current?.skip();
            requestAnimationFrame(() =>
              exploreLink.current?.focus({ preventScroll: true }),
            );
          }}
          hidden={completed}
        >
          SKIP INTRO →
        </button>
        <a
          ref={exploreLink}
          className="network-explore"
          href="#philosophy"
          hidden={!completed}
        >
          ENTER GENT RESERVE CO. ↓
        </a>
        <button
          className="network-replay"
          onClick={() => {
            setLoadRequest((n) => n + 1);
            presentation.current ??= enterMobilePresentation(root.current!, () => director.current?.skip());
            director.current?.replay();
            requestAnimationFrame(() =>
              skipButton.current?.focus({ preventScroll: true }),
            );
          }}
          hidden={!completed}
        >
          REPLAY NETWORK ↻
        </button>
      </div>
      <p className="network-live-status" role="status" aria-live="polite">
        {state === "PREPARING"
          ? "INITIALIZING NETWORK"
          : completed
            ? "Network ready. Explore Gent Reserve Co."
            : running
              ? "Gent network activating. Skip intro is available."
              : ""}
      </p>
    </section>
  );
}
